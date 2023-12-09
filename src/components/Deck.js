export class Deck {
  constructor(initialState = {}) {
    this.id = initialState.id || 1;
    this.remaining = initialState.remaining || 52;
    this.shuffled = initialState.shuffled || true;
  }

  //api calls
  async newDeck() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/")
      .then((response) => {
        const data = JSON.parse(response);

        this.setId(data.deck_id);
        this.setRemaining(data.remaining);
        this.setShuffled(data.shuffled);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async deal(amount) {
    await fetch();
  }

  async deckExists() {
    const deckId = this.getId();

    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/`)
      .then((response) => {
        console.log(response.json());
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
