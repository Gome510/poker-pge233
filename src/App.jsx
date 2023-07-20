import React, { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import BetBar from "./components/BetBar";
import PlayerCard from "./components/PlayerCard";

function App() {
  return (
    <div className="background-image">
      <ActionBar />
      <BetBar />
      <PlayerCard 
        top={180} 
        left={320} 
      />
      <PlayerCard 
        top={530} 
        left={"45%"} 
      />
      <PlayerCard 
        top={180} 
        left={"45%"} 
      />
      <PlayerCard 
        top={530} 
        left={"45%"} 
      />
      <PlayerCard 
        top={530} 
        left={"45%"} 
      />
      
    </div>
  );
}

export default App;
