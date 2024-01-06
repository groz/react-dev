const express = require('express');
const compression = require('compression');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;
const esbuild_port = 9000;

const publicPath = path.join(__dirname, '/public');

// Compression middleware doesn't work with SSE.
// See: https://github.com/expressjs/compression#server-sent-events
DEV: app.use(compression(
    {
        filter: function excludeHotReload(req, res) {
            if (req.url.includes('/esbuild')) {
                return false;
            }
            return compression.filter(req, res);
        }
    }
));
PROD: app.use(compression());

// Note: define app routes before proxy setup.
app.get('/what', (req, res) => {
    res.send('Hello World - updated!!!')
});

// Proxy client requests to esbuild in dev mode.
DEV: app.use('/', createProxyMiddleware(`http://localhost:${esbuild_port}`));
PROD: app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    DEV: console.log('Development mode with live reload enabled.');
});
