export class Poker {
  constructor() {
    this.phase = "preflop";
    this.pot = 0;
    this.round = 0;
    this.playerTurn = 0;
  }

  constructor(game) {
    this.phase = game.phase;
    this.pot = game.pot;
    this.round = round;
    this.playerTurn = playerTurn;
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
