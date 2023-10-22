import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import CardHandler from "./components/CardHandler";

function App() {
  const [game, setGame] = useState({
    started: false,
    pot: 0,
    round: 0,
    phase: "pre-flop", //pre-flop (deal), flop (3), turn (1), river (1)
    playerTurn: 0,
  });
  const [players, setPlayers] = useState([]);
  /* let playerMoney = [10000,10000,10000,10000,10000]
  let sharedCards = [];
  let gameStarted = false;
  let pot = 0;
  let playerCards = [];
  let playerStatus = ["In","In","In","In","In"];
  let turn = 0;
  let round = 0; */
  function startGame() {
    setGame((prevGame) => ({
      ...prevGame,
      started: true,
    }));

    initPlayers();
    console.log(players);
  }

  function initPlayers() {
    let newPlayers = [];
    for (let i = 0; i < 5; i++) {
      let isCPU = i != 2;
      let player = {
        seat: i + 1,
        balance: 10000,
        cards: [],
        isCPU: isCPU,
        bet: 0,
        isPlaying: true,
      };
      newPlayers.unshift(player);
      console.log(player);
    }
    setPlayers(newPlayers);
  }

  return (
    <div className="background-image">
      {!gameStarted ? ( // Render the button only if the game has not started
        <button id="start-game" onClick={startGame}>
          Start Poker Game
        </button>
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
