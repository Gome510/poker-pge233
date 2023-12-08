import ActionBar from "./ActionBar/ActionBar";
import BetBar from "./BetBar/BetBar";
import Players from "./Players/Players";
import { useState, useEffect } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Poker } from "./Poker";

function Game({ gameData }) {
  const [game, setGame] = useState(new Poker(gameData));

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }
  return (
    <>
      <ActionBar />
      <BetBar game={game} />
      <Players players={game.getPlayers()} />
      <TestToolbar game={game} handleGameChange={handleGameChange} />
    </>
  );
}

export default Game;
