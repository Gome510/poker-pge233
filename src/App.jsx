import React, { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import BetBar from "./components/BetBar";
import PlayerCard from "./components/PlayerCard";
import CardHandler from "./components/CardHandler";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function startGame(){
    setGameStarted(true);
  };

  return (
    <div className="background-image">
      {!gameStarted ? ( // Render the button only if the game has not started
        <button id="start-game" onClick={startGame}>Start Poker Game</button>
      ) : (
        <>
          <ActionBar />
          <BetBar />
          <PlayerCard top={180} left={"15%"} />
          <PlayerCard top={530} left={"45%"} />
          <PlayerCard top={180} left={"70%"} />
          <PlayerCard top={430} left={"15%"} />
          <PlayerCard top={430} left={"70%"} />
          
        </>
      )}
    </div>
  );
}

export default App;
