import React, { useState } from 'react'
import './App.css'
import ActionBar from './components/ActionBar'
import BetBar from './components/BetBar'
import PlayerCard from './components/PlayerCard'

function App() {
  
  return (
    <div className="background-image">
      <ActionBar />
      <BetBar />
      <PlayerCard />
    </div>
  )
}

export default App
