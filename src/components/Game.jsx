import ActionBar from "./ActionBar/ActionBar";
import Players from "./Players/Players";
import { useState, useEffect, useRef } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Poker } from "./Poker";
import CardsList from "./CardsList/CardsList";

function Game({ gameData }) {
  const [game, setGame] = useState(new Poker(gameData));

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }
  const cpuActionInProgress = useRef(false);

  useEffect(() => {
    const currentPlayer = game.currentPlayer();
    console.log(game);

    if (
      currentPlayer.isCPU &&
      currentPlayer.isPlaying &&
      !cpuActionInProgress.current
    ) {
      cpuActionInProgress.current = true;
      setTimeout(() => {
        let gameUpdate = new Poker(game);

        gameUpdate.cpuAction();
        handleGameChange(gameUpdate);
        cpuActionInProgress.current = false;
      }, 1500);
    }
  }, [game]);

  return (
    <>
      {game.playerTurn == 2 && (
        <ActionBar game={game} handleGameChange={handleGameChange} />
      )}
      <Players players={game.players} playerTurn={game.playerTurn} />
      <TestToolbar game={game} handleGameChange={handleGameChange} />
      <CardsList
        position={{ top: "50%", left: "50%" }}
        cards={game.commmunityCards}
      />
    </>
  );
}

export default Game;
