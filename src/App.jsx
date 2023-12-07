import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  const [gameData, setGameData] = useState();

  useEffect(() => {
    let gameData = JSON.parse(localStorage.getItem("gameData"));
    if (localStorage.getItem("gameData")) {
      setGameData(true);
    }
  }, []);

  function startGame() {
    setGameData(true);
    console.log("Game Data: " + gameData);
  }

  return (
    <div className="background-image">
      {!gameData ? ( // Render the button only if the game has not Data
        <button id="start-game" onClick={startGame}>
          Start Poker Game
        </button>
      ) : (
        <Game data={gameData} />
      )}
    </div>
  );
}

export default App;
