import React, {useState, useEffect} from "react";

function CardHandler() {
    const [deck, setDeck] = useState()
    const [round, setRound] = useState()
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data)=>{

                console.log(data)
                setDeck(data)
                
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/lvankzmeua6t/shuffle/")
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                setDeck(data)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    /* useEffect(()=>{
        fetch("https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2")
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                setCards(data)
            })
            .catch((err)=>{
                console.log(err.message)
            })
    },[]) */

    return ( 
        <div>

        </div>
    );
}

export default CardHandler;