const express = require('express');
const compression = require('compression');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;
const esbuild_port = 9000;

const publicPath = path.join(__dirname, "/public");

app.use(compression({ threshold: 1024 }));

app.get('/what', (req, res) => {
    res.send('Hello World - updated!!!')
});

// TODO: enable this for prod build and keep the proxy for dev only
// app.use(express.static(publicPath));

app.use('/', createProxyMiddleware(`http://localhost:${esbuild_port}`));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
