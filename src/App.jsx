import React, { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import BetBar from "./components/BetBar";
import PlayerCard from "./components/PlayerCard";
import CardHandler from "./components/CardHandler";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [ players, setPlayers]  = useState([]);
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
      };

      newPlayers.unshift(player);
      console.log(player)
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
        <>
          <ActionBar />
          <BetBar />
          <PlayerCard top={180} left={"15%"} />
          <PlayerCard top={530} left={"45%"} />
          <PlayerCard top={180} left={"70%"} />
          <PlayerCard top={430} left={"15%"} />
          <PlayerCard top={430} left={"70%"} />
        </>
      )}
    </div>
  );
}

export default App;
