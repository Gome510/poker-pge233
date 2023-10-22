import ActionBar from "./ActionBar";
import BetBar from "./BetBar";
import Players from "./Players";
import { useState, useEffect } from "react";
import TestToolbar from "./TestToolbar";

function Game() {
  const [game, setGame] = useState({
    pot: 0,
    round: 0,
    phase: "pre-flop", //pre-flop (deal), flop (3), turn (1), river (1)
    playerTurn: 0,
  });
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

  return (
    <>
      <ActionBar />
      <BetBar game={game} />
      <Players players={players} />
      <TestToolbar game={game} players={players} />
    </>
  );
}

export default Game;
