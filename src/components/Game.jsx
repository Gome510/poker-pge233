import ActionBar from "./ActionBar/ActionBar";
import BetBar from "./BetBar/BetBar";
import Players from "./Players/Players";
import { useState, useEffect } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Poker } from "./Poker";

function Game({ gameData }) {
  const [game, setGame] = useState(new Poker(gameData));
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    initPlayers();
  }, []);

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

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }

  return (
    <>
      <ActionBar />
      <BetBar game={game} />
      <Players players={players} />
      <TestToolbar
        game={game}
        handleGameChange={handleGameChange}
        players={players}
      />
    </>
  );
}

export default Game;
