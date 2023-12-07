import "./PlayerCard.css";

export default function Players() {
  const cardCoords = [{ top: "100px", left: "100px" }];

  return (
    <>
      {cardCoords.map((coords) => (
        <PlayerCard top={coords.top} left={coords.left} />
      ))}
    </>
  );
}

function PlayerCard({ top, left }) {
  const playerStyle = {
    top: top || 0,
    left: left || 0,
  };
  return (
    <div className="player-card" style={playerStyle}>
      <img src="/assets/default_pfp.png" />
      <div className="player-nameplate">
        <h3>Player Name</h3>
        <p>Money Amount</p>
      </div>
    </div>
  );
}
