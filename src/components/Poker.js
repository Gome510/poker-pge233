class Poker {
  constructor() {
    this.phase = "preflop";
    this.pot = 0;
    this.round = 0;
    this.playerTurn = 0;
  }

  //Getters
  getPhase() {
    return this.phase;
  }

  getPot() {
    return this.pot;
  }

  getRound() {
    return this.round;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }

  //Setters
  setPhase(newPhase) {
    this.phase = newPhase;
  }

  setPot(newPot) {
    this.pot = newPot;
  }

  setRound(newRound) {
    this.round = newRound;
  }

  setPlayerTurn(newPlayerTurn) {
    this.playerTurn = newPlayerTurn;
  }

  //helper functions
  clearPot() {
    this.setPot(0);
  }
}
