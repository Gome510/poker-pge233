import { Deck } from "./components/Deck.js";

let deck = new Deck();

deck.shuffle();
deck.draw(2);
console.log(await deck.exists());

let nonExistantDeck = new Deck({ id: "asdfjsoif" });
console.log(await nonExistantDeck.exists());
