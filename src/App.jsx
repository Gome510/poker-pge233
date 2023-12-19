import React, { useState, useEffect } from "react";
import "./App.css";
import GameComponent from "./components/GameComponent.jsx";
import { Game } from "./components/Game.js";

function App() {
  const [gameData, setGameData] = useState();

  useEffect(() => {
    let gameData = JSON.parse(localStorage.getItem("gameData"));
    if (localStorage.getItem("gameData")) {
      setGameData(gameData);
    }
  }, []);

  function startGame() {
    setGameData({});
    console.log("Game Data: " + gameData);
  }

  return (
    <div className="background-image">
      {!gameData ? ( // Render the button only if the game has no Data
        <button id="start-game" onClick={startGame}>
          Start Poker Game
        </button>
      ) : (
        <GameComponent data={gameData} />
      )}
    </div>
  );
}

export default App;
