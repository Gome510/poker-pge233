import React from "react";
import "./CardsList.css";

function CardsList({ position = { top: 0, left: 0 }, cards = [] }) {
  const cardComponents = cards.map((card) => (
    <Card key={card.code} card={card} />
  ));
  return (
    <div className="community-cards" style={position}>
      {cardComponents}
    </div>
  );
}

export default CardsList;

function Card({ card = {} }) {
  return (
    <img width={65} src={card.image} alt={`${card.value} of ${card.suit}`} />
  );
}
