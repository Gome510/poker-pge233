import { Player } from "./Player.js";
import { Deck } from "./Deck.js";
//TODO: Update EndOfPhase() to check if there are no actions left to make
const phases = ["ante", "preflop", "flop", "turn", "river"];
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
    this.commmunityCards = initialState.commmunityCards || [];
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
      case "ante":
        this.action("ante-in");
        break;
      case "preflop":
        this.action("check");
        break;
      case "flop":
        this.action("check");
        break;
      case "turn":
        this.action("check");
        break;
      case "river":
        this.action("check");
        break;
      default:
    }
  }

  action(actionType = "", amount = 0) {
    const currentPlayer = this.currentPlayer();
    switch (actionType) {
      case "ante-in":
        currentPlayer.subtractBalance(this.ante);
        this.addToPot(this.ante);
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
        this.addToPot(amount - this.currentBid);
        this.currentBid = amount;
        break;

      case "call":
        currentPlayer.lastAction = actionType;
        this.addToPot(amount - currentPlayer.bet);
        currentPlayer.setBet(this.getCurrentBid());
        break;

      case "fold":
        currentPlayer.lastAction = actionType;
        currentPlayer.setIsPlaying(false);
        break;

      default:
        console.error(`Bug: Poker: action(): ${actionType}, invalid action`);
        return;
    }

    this.nextPlayer();
  }

  findWinner() {
    let winner = 0;

    this.players.forEach((player) => {
      if (!player.isPlaying) return;

      this.bestHand(player.cards);
    });

    return;
  }

  bestHand(cards = []) {
    if (cards.length != 2) {
      console.error(
        "Poker.bestHand() requires a 'cards' array argument with exactly 2 elements"
      );
    }

    const totalCards = [...this.commmunityCards, ...cards];
    const pokerHands = {
      "Royal Flush": false,
      "Straight Flush": false,
      "Four of a Kind": false,
      "Full House": false,
      Flush: false,
      Straight: false,
      "Three of a Kind": false,
      "Two Pair": false,
      "One Pair": false,
      "High Card": false,
    };

    for (let i = 0; i < totalCards.length; i++) {
      if (hasRoyalFlush(totalCards)) {
        pokerHands["Royal Flush"] = true;
      }
    }
  }

  //helper functions
  hasRoyalFlush(cards = []) {
    const mostAbundantSuit = this.findMostAbundantSuit(cards);
    if (mostAbundantSuit.amount < 5) return false;

    const flushCards = cards.filter(
      (card) => card.suit == mostAbundantSuit.suit
    );
    const flushCardValues = flushCards.map((card) => card.value);

    let royalCards = ["ACE", "KING", "QUEEN", "JACK", "10"];
    let isRoyalFlush = true;

    while (isRoyalFlush) {
      if (royalCards.length == 0) break;

      if (!flushCardValues.includes(royalCards.pop())) isRoyalFlush = false;
    }

    return isRoyalFlush;
  }

  findMostAbundantSuit(cards = []) {
    let countSuits = {
      CLUBS: 0,
      HEARTS: 0,
      SPADES: 0,
      DIAMONDS: 0,
    };

    cards.forEach((card) => {
      countSuits[card.suit]++;
    });

    let mostSuitName = "";
    let mostSuitCount = 0;
    Object.keys(countSuits).forEach((suit) => {
      if (countSuits[suit] > mostSuitCount) {
        mostSuitCount = countSuits[suit];
        mostSuitName = suit;
      }
    });
    return {
      suit: mostSuitName,
      amount: mostSuitCount,
    };
  }

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

  dealCommunityCards() {
    switch (this.phase) {
      case "flop":
        for (let i = 0; i < 3; i++)
          this.commmunityCards.push(this.deck.drawn.pop());
        break;
      case "turn":
        this.commmunityCards.push(this.deck.drawn.pop());
        break;
      case "river":
        this.commmunityCards.push(this.deck.drawn.pop());
        break;
      default:
    }
  }

  nextRound() {
    this.setRound(this.getRound() + 1);
  }

  nextPlayer() {
    if (this.endOfPhase()) {
      this.nextPhase();
    }
    this.setPlayerTurn((this.playerTurn + 1) % this.playerCount);
  }

  nextPhase() {
    const currentPhaseIndex = phases.findIndex(
      (phase) => phase == this.getPhase()
    );
    const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    this.setPhase(phases[nextPhaseIndex]);
    this.clearBid();

    //perform next phase task
    switch (this.phase) {
      case "ante":
        //clear all player cards and community cards
        this.deck.shuffle();
        break;
      case "preflop":
        this.prepareCards();
        this.dealPlayerCards();
        break;
      case "flop":
        //deal first 3 community cards
        break;
      case "turn":
        //deal 4th community card
        break;
      case "river":
        //deal 5th community card
        break;
      default:
    }
  }

  addToPot(amount) {
    this.pot += amount;
  }

  clearBid() {
    this.currentBid = 0;
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
