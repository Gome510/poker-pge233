export class Deck {
  constructor(initialState = {}) {
    this.id = initialState.id || "8qrpkf08dqfq";
    this.remaining = initialState.remaining || 52;
    this.shuffled = initialState.shuffled || false;
  }

  //api calls
  async newDeck() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        this.setId(json.deck_id);
        this.setRemaining(json.remaining);
        this.setShuffled(json.shuffled);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async shuffle() {
    await fetch(
      `https://www.deckofcardsapi.com/api/deck/${this.getId()}/shuffle/?deck_count=1`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        this.setId(json.deck_id);
        this.setRemaining(json.remaining);
        this.setShuffled(json.shuffled);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async draw(amount) {
    await fetch(
      `https://www.deckofcardsapi.com/api/deck/${this.getId()}/draw/?count=${amount}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setShuffled(false);
        return { cards: json.cards, remaining: json.remaining };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async deckExists() {
    const deckId = this.getId();

    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
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
}
