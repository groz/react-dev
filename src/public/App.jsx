import * as React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
    return (
        <>
            <h1>This is my app.</h1>
            <span> My app is amazing</span>
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

DEV: (function setupHotReload() {
    const evtSrc = new EventSource('/esbuild');

    evtSrc.addEventListener('change', (e) => location.reload());

    evtSrc.addEventListener('open', (e) => {
        console.log('Hot reload enabled...');
    });
})();
