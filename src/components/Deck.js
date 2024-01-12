//TODO: newDeck, exists
export class Deck {
  constructor(initialState = {}) {
    this.id = initialState.id || "8qrpkf08dqfq";
    this.remaining = initialState.remaining || 52;
    this.shuffled = initialState.shuffled || true;
    this.drawn = initialState.drawn || [];
    if (initialState.id == undefined) this.shuffle();
  }

  //api calls
  async newDeck() {
    return await fetch("https://www.deckofcardsapi.com/api/deck/new/")
      .then((response) => response.json())
      .then((json) => {
        this.setId(json.deck_id);
        this.setRemaining(json.remaining);
        this.setShuffled(json.shuffled);

        return json.success;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async shuffle() {
    return await fetch(
      `https://www.deckofcardsapi.com/api/deck/${this.id}/shuffle/?deck_count=1`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setId(json.deck_id);
        this.setRemaining(json.remaining);
        this.setShuffled(json.shuffled);
        this.setDrawn([]);

        return json.success;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //takes number of cards to draw and returns them in an object with the number of cards remaining
  async draw(amount) {
    return await fetch(
      `https://www.deckofcardsapi.com/api/deck/${this.id}/draw/?count=${amount}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setShuffled(false);
        this.setRemaining(json.remaining);
        this.drawn.push(...json.cards);
        return json.cards;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //returns a true if deck exists in API database.
  async exists() {
    return await fetch(`https://www.deckofcardsapi.com/api/deck/${this.id}/`)
      .then((response) => response.json())
      .then((json) => {
        return json.success;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //helper function

  //getters
  getId() {
    return this.id;
  }

  getRemaining() {
    return this.remaining;
  }

  getShuffled() {
    return this.shuffled;
  }

  getDrawn() {
    return this.drawn;
  }

  //setters
  setId(value) {
    this.id = value;
  }

  setRemaining(value) {
    this.remaining = value;
  }

  setShuffled(value) {
    this.shuffled = value;
  }

  setDrawn(value) {
    this.drawn = value;
  }
}
