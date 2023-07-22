import React, { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import BetBar from "./components/BetBar";
import PlayerCard from "./components/PlayerCard";
import CardHandler from "./components/CardHandler";

function App() {
  return (
    <div className="background-image">
      <ActionBar />
      <BetBar />
      <PlayerCard 
        top={180} 
        left={"15%"} 
      />
      <PlayerCard 
        top={530} 
        left={"45%"} 
      />
      <PlayerCard 
        top={180} 
        left={"70%"} 
      />
      <PlayerCard 
        top={430} 
        left={"15%"} 
      />
      <PlayerCard 
        top={430} 
        left={"70%"} 
      />
      <CardHandler />  
    </div>
  );
}

export default App;
