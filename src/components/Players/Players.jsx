import "./Players.css";
import CardsList from "../CardsList/CardsList";

export default function Players({ players = [], playerTurn = 0 }) {
  const positions = [
    { top: 30, left: 23 }, //Player 5
    { top: 70, left: 23 }, //Player 4
    { top: 80, left: 50 }, //Player 3
    { top: 70, left: 77 }, //Player 2
    { top: 30, left: 77 }, //Player 1
  ].reverse();

  return (
    <>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          top={positions[index].top}
          left={positions[index].left}
          player={player}
          isPlayersTurn={playerTurn + 1 == player.seat}
        />
      ))}
    </>
  );
}

function PlayerCard({ top, left, player, isPlayersTurn }) {
  const playerPosition = {
    top: `${top}%` || 0,
    left: `${left}%` || 0,
  };
  const cardPosition = {
    top: `${top - 5}%` || 0,
    left: `${left}%` || 0,
  };

  const bgActive = isPlayersTurn ? "bg-active" : "bg-inactive";

  return (
    <>
      {player.cards && (
        <CardsList position={cardPosition} cards={player.cards} />
      )}
      <div className={`${bgActive} player-card `} style={playerPosition}>
        <img src="/assets/default_pfp.png" />
        <div className="player-nameplate">
          <h3>{player.name}</h3>
          <p>{player.balance}</p>
        </div>
      </div>
    </>
  );
}
