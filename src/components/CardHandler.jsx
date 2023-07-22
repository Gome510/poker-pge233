import React, {useState, useEffect} from "react";

function CardHandler() {
    const [deck, setDeck] = useState()
    const [shuffle, setShuffle] = useState()

    useEffect(() => {
        fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data)=>{
                
                setDeck(data)
                console.log(data)
                console.log(deck)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    /* useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/lvankzmeua6t/shuffle/")
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                setDeck(data)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []) */

    return ( 
        <div>

        </div>
    );
}

export default CardHandler;