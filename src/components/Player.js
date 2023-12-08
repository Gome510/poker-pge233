export class Player {
  constructor(initialState = {}) {
    this.name = initialState.name || "Player Name";
    this.seat = initialState.seat || 0;
    this.balance = initialState.balance || 10000;
    this.cards = initialState.cards || [];
    this.isCPU = initialState.isCPU == null ? true : initialState.isCPU;
    this.bet = initialState.bet || 0;
    this.isPlaying = initialState.isPlaying || true;
  }

  //getters
  getSeat() {
    return this.seat;
  }

  getBalance() {
    return this.balance;
  }

  getCards() {
    return this.cards;
  }

  getIsCPU() {
    return this.isCPU;
  }

  getBet() {
    return this.bet;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  //setters
  setSeat(value) {
    this.seat = value;
  }

  setBalance(value) {
    this.balance = value;
  }

  setCards(value) {
    this.cards = value;
  }

  setIsCPU(value) {
    this.isCPU = value;
  }

  setBet(value) {
    this.bet = value;
  }

  setIsPlaying(value) {
    this.isPlaying = value;
  }

  //helper functions
}
