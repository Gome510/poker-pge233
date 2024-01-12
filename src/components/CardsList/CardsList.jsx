import React from "react";

function CardsList({ cards = [] }) {
  const cardComponents = cards.map((card) => (
    <Card key={card.code} card={card} />
  ));
  return <div className="community-cards">{cardComponents}</div>;
}

export default CardsList;

function Card({ card = {} }) {
  return (
    <img width={100} src={card.image} alt={`${card.value} of ${card.suit}`} />
  );
}
