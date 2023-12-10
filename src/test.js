import { Deck } from "./components/Deck.js";

let deck = new Deck();

await deck.draw(2);
await deck.shuffle();
console.log(await deck.exists());

let nonExistantDeck = new Deck({ id: "asdfjsoif" });
console.log(await nonExistantDeck.exists());
