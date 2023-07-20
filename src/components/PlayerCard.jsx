import React from "react";
import "./PlayerCard.css";

function PlayerCard(props) {
  const playerStyle = {
    top: props.top || 0,
    left: props.left || 0,
  };
  return (
    <div className="player-card" style={playerStyle}>
      <img src="src\assets\default_pfp.png" />
      <div className="player-nameplate">
        <h3>Player Name</h3>
        <p>Money Amount</p>
      </div>
    </div>
  );
}

export default PlayerCard;
