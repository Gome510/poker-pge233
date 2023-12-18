import ActionBar from "./ActionBar/ActionBar";
import Players from "./Players/Players";
import { useState, useEffect } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Poker } from "./Poker";
//TODO: Make game loop
function Game({ gameData }) {
  const [game, setGame] = useState(new Poker(gameData));

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }

  useEffect(() => {
    const currentPlayer = game.currentPlayer();
    console.log(`Player Turn: ${game.playerTurn}`);

    if (currentPlayer.isCPU) {
      let gameUpdate = new Poker(game);
      if (currentPlayer.isPlaying) {
        gameUpdate.cpuAction();
      }

      handleGameChange(gameUpdate);
    }
  }, [game]);

  return (
    <>
      {game.playerTurn == 2 && (
        <ActionBar game={game} handleGameChange={handleGameChange} />
      )}
      <Players players={game.getPlayers()} />
      <TestToolbar game={game} handleGameChange={handleGameChange} />
    </>
  );
}

export default Game;
