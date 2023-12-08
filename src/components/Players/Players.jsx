import "./Players.css";

export default function Players({ players }) {
  const cardCoords = [
    { top: "200px", left: "200px" },
    { top: "400px", left: "200px" },
    { top: "500px", left: "600px" },
    { top: "400px", left: "900px" },
    { top: "200px", left: "900px" },
  ];

  return (
    <>
      {players.map((player, index) => (
        <PlayerCard
          top={cardCoords[index].top}
          left={cardCoords[index].left}
          name={player.name}
        />
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
