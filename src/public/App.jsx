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

const root = createRoot(document.getElementById('root'));
root.render(<App />);
