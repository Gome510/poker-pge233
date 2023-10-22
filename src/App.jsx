import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import CardHandler from "./components/CardHandler";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  /* let playerMoney = [10000,10000,10000,10000,10000]
  let sharedCards = [];
  let gameStarted = false;
  let pot = 0;
  let playerCards = [];
  let playerStatus = ["In","In","In","In","In"];
  let turn = 0;
  let round = 0; */
  function startGame() {
    setGameStarted(true);
    console.log("Game Started: " + gameStarted);
  }

  return (
    <div className="background-image">
      {!gameStarted ? ( // Render the button only if the game has not started
        <button id="start-game" onClick={startGame}>
          Start Poker Game
        </button>
      ) : (
        <Game game={game} />
      )}
    </div>
  );
}

export default App;
