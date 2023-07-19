import React, { useState } from "react";
import "./BetBar.css"

export default function BetBar() {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (event) => {
        const value = event.target.value;
        setSliderValue(value);

    }

    return (
        <div className="bet-bar">
            <p>Bet: {sliderValue}</p>
            <input 
                type="range" 
                min="0" 
                max="100" 
                className="slider" 
                id="myRange" 
                onChange={handleSliderChange}
            />

        </div>
    )
}