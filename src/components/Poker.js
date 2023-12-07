export class Poker {
  constructor(initalState = {}) {
    this.phase = initalState.phase || "preflop";
    this.pot = initalState.pot || 0;
    this.round = initalState.round || 0;
    this.playerTurn = initalState.playerTurn || 0;
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
  nextRound() {
    this.setRound(this.round + 1);
  }

  clearPot() {
    this.setPot(0);
  }
}
