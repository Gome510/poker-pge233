import React, { useState } from "react";
import { Game } from "../Game.js";
import "./ActionBar.css";

export default function ActionBar({ game, handleGameChange }) {
  //TODO: Change "sliderValue" to "betAmount". Implement betting slider.
  const [sliderValue, setSliderValue] = useState(50);

  function handleSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value);
  }

  async function handleActionButtonClick(event) {
    const { value } = event.target;
    const gameUpdate = new Game(game);
    await gameUpdate.action(value, sliderValue);
    handleGameChange(gameUpdate);
  }

  const currentBid = game.getCurrentBid();

  return game.phase == "ante" ? (
    <AnteIn handleClick={handleActionButtonClick} />
  ) : (
    <>
      <div className="action-bar">
        <button
          type="button"
          value={currentBid == 0 ? "check" : "call"}
          onClick={handleActionButtonClick}
        >
          {currentBid == 0 ? "Check" : "Call"}
        </button>

        <button
          type="button"
          value={currentBid == 0 ? "bet" : "raise"}
          onClick={handleActionButtonClick}
        >
          {currentBid == 0 ? "Bet" : "Raise"}
        </button>

        <button type="button" value="fold" onClick={handleActionButtonClick}>
          Fold
        </button>
      </div>

      <div className="bet-bar">
        <p>Bet: {sliderValue}</p>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={50}
          className="slider"
          id="myRange"
          onChange={handleSliderChange}
        />
      </div>
    </>
  );
}

function AnteIn({ handleClick }) {
  return (
    <div className="action-bar">
      <button type="button" value="ante-in" onClick={handleClick}>
        Ante-In
      </button>
    </div>
  );
}
