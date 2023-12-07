import React from "react";
import { Button } from "react-bootstrap";
import { Poker } from "../Poker";

function TestToolbar({ game, handleGameChange }) {
  function handleRoundClick() {
    let gameUpdate = new Poker(game);
    gameUpdate.nextRound();
    handleGameChange(gameUpdate);
  }

  function handlePotClick() {
    let gameUpdate = new Poker(game);
    gameUpdate.clearPot();
    handleGameChange(gameUpdate);
  }

  function handlePhaseClick() {
    let gameUpdate = new Poker(game);
    gameUpdate.nextPhase();
    handleGameChange(gameUpdate);
  }

  function handlePlayerTurnClick() {
    let gameUpdate = new Poker(game);
    gameUpdate.nextPlayer();
    handleGameChange(gameUpdate);
  }

  return (
    <div>
      <Button onClick={handleRoundClick}>Round: {game.round}</Button>
      <Button onClick={handlePotClick}>Pot: {game.pot}</Button>
      <Button onClick={handlePhaseClick}>Phase: {game.phase}</Button>
      <Button onClick={handlePlayerTurnClick}>
        Player Turn: {game.playerTurn}
      </Button>
    </div>
  );
}

export default TestToolbar;
