import { Deck } from "./components/Deck.js";

let deck = new Deck();

deck.shuffle();
deck.draw(2);
console.log(await deck.exists());

let nonExistantDeck = new Deck({ id: "asdfjsoif" });
console.log(await nonExistantDeck.exists());

/**
 * Try Jest testing framework. If you ever want to run tests on your react components, you will need it.
 * It works for testing plain ole JS as well, but its not required for that.
 *
 * If you want to practice writing tests, I suggest the following approach using javascript
 * (not react). Use the Arrange Act Assert approach (AAA)
 *  All test functions return true or false, no matter the testing tool or framework
 */

function testShuffleDeckReturnsAShuffledDeck() {
    let deck = new Deck(); // arrange subject under test (SUT)
    deck.shuffle();  // act: change the state of the subject under test
    return deck !== deck.shuffle();  // assert state is as expected
}

function testFullDeckHas52Cards() {
    let deck = new Deck();  // arrange subject under test (SUT)
    return deck.length === 52;  // assert state is as expected
}

function testDrawingCardsDecreasesDeckSize() {
    let newDeck = new Deck();  // arrange subject under test (SUT)
    deck.draw(3);  // act: change the state of the subject under test
    return deck.length === deck.length -3  // assert state is as expected
}

