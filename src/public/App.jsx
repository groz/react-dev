import * as React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
    return (
        <>
            <h1>This is my app with hot reload!</h1>
            <span> My app is amazing</span>
        </>
    )
}

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);

// Set up live reload. TODO: only run this in dev mode.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
