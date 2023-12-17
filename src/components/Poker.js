import { Player } from "./Player.js";
import { Deck } from "./Deck.js";

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
        break;
      case "flop":
        //check

        break;
      case "turn":
        //check
        break;
      case "river":
        //check
        break;
      default:
    }
  }

  action(actionType, amount = 0) {
    const currentPlayer = this.currentPlayer();
    switch (actionType) {
      case "check":
        currentPlayer.lastAction = actionType;
        break;
      case "bet":
      case "raise":
        if (amount == 0) {
          console.error(
            "Bug: Poker: action(): Bet/raise amount cannot be zero"
          );
          return;
        }

        currentPlayer.lastAction = actionType;
        currentPlayer.setBet(amount);
        this.currentBid = amount;
        break;
      case "call":
        currentPlayer.lastAction = actionType;
        currentPlayer.setBet(this.getCurrentBid());
        break;
      case "fold":
        currentPlayer.lastAction = actionType;
        currentPlayer.setIsPlaying(false);
        break;
      default:
        console.error(`Bug: Poker: action(): ${actionType}, invalid action`);
    }
  }

  //helper functions

  //draw and store 5 community cards and 2 cards per player
  async prepareCards() {
    await this.deck.draw(2 * this.playerCount + 5);
  }

  dealPlayerCards() {
    this.players.forEach((player) => {
      player.cards.push(this.deck.drawn.pop());
      player.cards.push(this.deck.drawn.pop());
    }, this);
  }

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

  //return true if all players have met the current bid.
  endOfPhase() {
    return (
      this.playerTurn == this.playerCount - 1 &&
      this.currentPlayer().bet == this.currentBid
    );
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
