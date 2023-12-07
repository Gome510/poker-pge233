import PlayerCard from "./PlayerCard/PlayerCard";

function Players() {
  const cardCoords = [{ top: "100", left: "100" }];

  return (
    <>
      {cardCoords.map((coords) => {
        <PlayerCard top={coords.top} left={coords.left} />;
      })}
    </>
  );
}

export default Players;
