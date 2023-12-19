import "./Players.css";

export default function GameTable({ players = [] }) {
  const cardCoords = [
    { top: "200px", left: "200px" },
    { top: "400px", left: "200px" },
    { top: "500px", left: "600px" },
    { top: "400px", left: "900px" },
    { top: "200px", left: "900px" },
  ].reverse();

  return (
    <>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          top={cardCoords[index].top}
          left={cardCoords[index].left}
          player={player}
        />
      ))}
    </>
  );
}

function PlayerCard({ top, left, player }) {
  const playerStyle = {
    top: top || 0,
    left: left || 0,
  };
  return (
    <div className="player-card" style={playerStyle}>
      <img src="/assets/default_pfp.png" />
      <div className="player-nameplate">
        <h3>{player.name}</h3>
        <p>{player.balance}</p>
      </div>
    </div>
  );
}
