import React, { useState } from "react";
import "./ActionBar.css";

export default function ActionBar({ game }) {
  const [sliderValue, setSliderValue] = useState(50);

  function handleSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value);
  }

  function handleActionButtonClick(event) {
    const { value } = event.target;

    switch (value) {
      case "act-btn-1":
        console.log(`Button Clicked: 1`);
        break;
      case "act-btn-2":
        console.log(`Button Clicked: 2`);
        break;
      case "act-btn-3":
        console.log(`Button Clicked: 3`);
        break;

      default:
    }
  }

  return (
    <>
      <div className="action-bar">
        <button
          type="button"
          value="act-btn-1"
          onClick={handleActionButtonClick}
        >
          {game.getCurrentBid() == 0 ? "Check" : "Call"}
        </button>

        <button
          type="button"
          value="act-btn-2"
          onClick={handleActionButtonClick}
        >
          {game.getCurrentBid() == 0 ? "Bet" : "Raise"}
        </button>

        <button
          type="button"
          value="act-btn-3"
          onClick={handleActionButtonClick}
        >
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
