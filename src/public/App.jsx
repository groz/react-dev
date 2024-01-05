import * as React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
    return (
        <>
            <h1>This is my ap1p.</h1>
            <span> My app is amazing</span>
        </>
    )
}

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);
