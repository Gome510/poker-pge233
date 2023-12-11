import { Player } from "./Player";
import { Deck } from "./Deck";

const phases = ["preflop", "flop", "turn", "river"];
export class Poker {
  constructor(initialState = {}) {
    this.deck = new Deck(initialState.deck || {});
    this.phase = initialState.phase || phases[0];
    this.pot = initialState.pot || 0;
    this.ante = initialState.ante || 10;
    this.currentBid = initialState.bid || 0;
    this.round = initialState.round || 0;
    this.playerTurn = initialState.playerTurn || 0;
    this.playerCount = initialState.playerCount || 5;
    this.players =
      initialState.players || this.initPlayers(this.getPlayerCount());
  }

  //initialization
  initPlayers(count) {
    let newPlayers = [];
    for (let i = 0; i < count; i++) {
      const isCPU = i != 2;
      let player = new Player({
        name: "Player " + (i + 1),
        seat: i + 1,
        isCPU: isCPU,
      });
      newPlayers.push(player);
    }
    return newPlayers;
  }

  //player actions
  cpuAction() {
    switch (this.phase) {
      case "preflop":
        this.anteInCurrentPlayer();
        this.dealStartingHand();
    }
  }

  //helper functions
  nextRound() {
    this.setRound(this.getRound() + 1);
  }

  nextPlayer() {
    this.setPlayerTurn((this.getPlayerTurn() + 1) % this.getPlayerCount());
  }

  nextPhase() {
    const currentPhaseIndex = phases.findIndex(
      (phase) => phase == this.getPhase()
    );
    const nextPhaseIndex = (currentPhaseIndex + 1) % 4;
    this.setPhase(phases[nextPhaseIndex]);
  }

  clearPot() {
    this.setPot(0);
  }

  anteInCurrentPlayer() {
    let player = this.currentPlayer();
    if (player.IsPlaying) {
      player.balance -= this.ante;
      this.pot += this.ante;
    }
  }

  //returns current player object
  currentPlayer() {
    return this.players[this.playerTurn];
  }

  drawRoundCards(numPlayersIn) {
    this.draw(5 + numPlayersIn);
  }

  /* Getters */
  getPhase() {
    return this.phase;
  }

  getPot() {
    return this.pot;
  }

  getAnte() {
    return this.ante;
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

  getPlayers() {
    return this.players;
  }

  getCurrentBid() {
    return this.currentBid;
  }

  //Setters
  setPhase(newPhase) {
    this.phase = newPhase;
  }

  setPot(newPot) {
    this.pot = newPot;
  }

  setAnte(newAnte) {
    this.ante = newAnte;
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
}
