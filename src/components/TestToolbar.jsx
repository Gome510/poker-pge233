import React from "react";
import { Button } from "react-bootstrap";

function TestToolbar({ game, players }) {
  return (
    <div>
      <Button>Round: {game.round}</Button>
      <Button>Pot: {game.pot}</Button>
      <Button>Phase: {game.phase}</Button>
      <Button>Round: {game.round}</Button>
    </div>
  );
}

export default TestToolbar;
