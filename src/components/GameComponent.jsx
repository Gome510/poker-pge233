import ActionBar from "./ActionBar/ActionBar";
import GameTable from "./Players/GameTable.jsx";
import { useState, useEffect } from "react";
import TestToolbar from "./DevTools/TestToolbar";
import { Game } from "./Game.js";
//TODO: Make game loop

// Remember: components are about rendering UI elements. Data belongs to models and is shared
// across your app as state.
function GameComponent({ gameData }) {
  // gameData is an update that is used to trigger a re-render of this component.
  const [game, setGame] = useState(new Game(gameData));

  function handleGameChange(gameUpdate) {
    setGame(gameUpdate);
  }

  function updateGame() {
    // some code that performs the necessary updates
  }

  // Goal: Have the player perform an action.
  useEffect(() => {
    const currentPlayer = game.currentPlayer();
    console.log(`Player Turn: ${game.playerTurn}`);

    if (currentPlayer.isCPU) {
      // There should probably be 1 instance of the game, for example:
      updateGame();
      // This data should already be in gameData, since it was passed to this component.
      // let gameUpdate = new Poker(game);

      // ideally, all players perform some action when its their turn. Its just that
      // the CPU's action is automated. For example ...

      // `isPlaying` can be checked on the player rather than here so you can just call the action:
      // if (currentPlayer.isPlaying) {
        let gameUpdate = currentPlayer.someAction();
        // gameUpdate.cpuAction();
      // }

      handleGameChange(gameUpdate);
    }
  }, [game]);


  return (
    <>
      {game.playerTurn == 2 && (
        <ActionBar game={game} handleGameChange={handleGameChange} />
      )}
      <GameTable players={game.getPlayers()} />
      <TestToolbar game={game} handleGameChange={handleGameChange} />
    </>
  );
}

export default GameComponent;
