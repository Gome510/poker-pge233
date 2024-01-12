import ActionBar from "./ActionBar/ActionBar";
import Players from "./Players/Players";
import { useState, useEffect } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Poker } from "./Poker";
import CardsList from "./CardsList/CardsList";
//TODO: Make game loop
function Game({ gameData }) {
  const [game, setGame] = useState(new Poker(gameData));

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }

  useEffect(() => {
    const currentPlayer = game.currentPlayer();
    console.log(game);

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
      <Players players={game.players} />
      <TestToolbar game={game} handleGameChange={handleGameChange} />
      <CardsList
        position={{ top: "50%", left: "50%" }}
        cards={game.commmunityCards}
      />
    </>
  );
}

export default Game;
