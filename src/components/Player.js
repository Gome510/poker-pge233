export class Player {
  constructor(initialState = {}) {
    this.name = initialState.name || "Player Name";
    this.seat = initialState.seat || 0;
    this.lastAction = initialState.lastAction || "";
    this.balance = initialState.balance || 10000;
    this.cards = initialState.cards || [];
    this.isCPU = initialState.isCPU == null ? true : initialState.isCPU;
    this.bet = initialState.bet || 0;
    this.isPlaying = initialState.isPlaying || true;
  }
  //helper functions
  bet(amount) {
    this.subtractBalance(amount - this.bet);
    this.setBet(amount);
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

  getLastAction() {
    return this.lastAction;
  }

  //setters
  setSeat(value) {
    this.seat = value;
  }

  addBalance(amount) {
    this.balance += amount;
  }

  subtractBalance(amount = -1) {
    if (amount < 0) {
      console.error(
        "Bug: Player: subtractBalance(): amount not provided or negative"
      );
    } else if (amount >= this.balance) {
      //All-in
      this.balance = 0;
    } else {
      //Normal Bet
      this.balance = this.balance - amount;
    }
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
}
