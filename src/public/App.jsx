import * as React from "react";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

DEV: (function setupHotReload() {
  const evtSrc = new EventSource("/esbuild");

  evtSrc.addEventListener("change", (e) => window.location.reload());

  evtSrc.addEventListener("open", (e) => {
    console.log("Hot reload enabled...");
  });
})();

const root = createRoot(document.getElementById("root"));
DEV: root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
PROD: root.render(<App />);

function App() {
  return <Game />;
}

function calculateGameOver(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < lines.length; i++) {
    const a = squares[lines[i][0]];
    const b = squares[lines[i][1]];
    const c = squares[lines[i][2]];

    if (a && a === b && b === c && a === c) {
      return true;
    }
  }

  return false;
}

function Status({ turn, isGameOver }) {
  const message = isGameOver
    ? `Winner: ${turn % 2 === 0 ? "O" : "X"}`
    : `Turn: ${turn % 2 === 0 ? "X" : "O"}`;

  return <span>{message}</span>;
}

function Square({ value, onClick }) {
  return <button onClick={onClick} className="square">{value}</button>;
}

function Game() {
  const emptyCells = Array(9).fill(null);

  const [turn, setTurn] = useState(0);
  const [squares, setSquares] = useState(emptyCells);
  const [history, setHistory] = useState([squares]);

  function handleClick(squareIndex) {
    if (squares[squareIndex] || calculateGameOver(squares)) {
      return;
    }

    const xTurn = turn % 2 === 0;

    const newSquares = squares.slice();
    newSquares[squareIndex] = xTurn ? "X" : "O";

    setTurn(turn + 1);
    setSquares(newSquares);
    setHistory([...history.slice(), newSquares]);
  }

  function handleHistoryClick(i) {
    setTurn(i);
    const newHistory = history.slice(0, i + 1);
    setHistory(newHistory);
    setSquares(newHistory[newHistory.length - 1]);
  }

  return (
    <>
      <div>
        <Status turn={turn} isGameOver={calculateGameOver(squares)} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={squares[0]} />
        <Square onClick={() => handleClick(1)} value={squares[1]} />
        <Square onClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={squares[3]} />
        <Square onClick={() => handleClick(4)} value={squares[4]} />
        <Square onClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={squares[6]} />
        <Square onClick={() => handleClick(7)} value={squares[7]} />
        <Square onClick={() => handleClick(8)} value={squares[8]} />
      </div>
      <div>
        {history.map((s, i) => (
          <button key={i} onClick={() => handleHistoryClick(i)}>
            Turn: {i}
          </button>
        ))}
      </div>
    </>
  );
}
