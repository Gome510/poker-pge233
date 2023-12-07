import React from "react";
import { Button } from "react-bootstrap";

function TestToolbar({ game, handleGameChange, players }) {
  function handleRoundClick() {
    let gameUpdate = new Game(game);
    gameUpdate.nextRound();
    handleGameChange(gameUpdate);
  }

  return (
    <div>
      <Button onClick={handleRoundClick}>Round: {game.round}</Button>
      <Button>Pot: {game.pot}</Button>
      <Button>Phase: {game.phase}</Button>
      <Button>Player Turn: {game.playerTurn}</Button>
    </div>
  );
}

export default TestToolbar;
