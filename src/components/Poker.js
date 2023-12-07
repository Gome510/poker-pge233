const phases = ["preflop", "flop", "turn", "river"];
export class Poker {
  constructor(initalState = {}) {
    this.phase = initalState.phase || phases[0];
    this.pot = initalState.pot || 0;
    this.round = initalState.round || 0;
    this.playerTurn = initalState.playerTurn || 0;
    this.playerCount = initalState.playerCount || 5;
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

  getPlayerCount() {
    return this.playerCount;
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

  setPlayerCount(newPlayerCount) {
    this.playerCount = newPlayerCount;
  }

  //helper functions
  nextRound() {
    this.setRound(this.getRound() + 1);
  }

  clearPot() {
    this.setPot(0);
  }

  nextPhase() {
    const currentPhaseIndex = phases.findIndex(this.getPhase());
    const nextPhaseIndex = (currentPhaseIndex + 1) % 4;
    this.setPhase(phases[nextPhaseIndex]);
  }

  nextPlayer() {
    this.setPlayerTurn((this.getPlayerTurn + 1) % this.getPlayerCount);
  }
}
