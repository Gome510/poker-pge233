import React from "react";
import "./PlayerCard.css";
function PlayerCard() {
  return (
    <div className="player-card">
      <img src="src\assets\default_pfp.png" />
      <div className="player-nameplate">
        <h3>Player Name</h3>
        <p>Money Amount</p>
      </div>
    </div>
  );
}

export default PlayerCard;
