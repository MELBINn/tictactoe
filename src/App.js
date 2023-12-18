
import { useState } from 'react';
import "./App.css"

import Board from './board';


export default function Game() {
  // State to manage the game's history
  const [history, setHistory] = useState([Array(9).fill(null)]);
    // State to track the current move in the history
  const [currentMove, setCurrentMove] = useState(0);
  // Determine if 'X' is the next player based on the current move number
  const xIsNext = currentMove % 2 === 0;
    // Get the squares configuration for the current move
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {//move: Represents the index or number of the move in the game's history.
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

