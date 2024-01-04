import { Player } from "./Player.js";
import { Deck } from "./Deck.js";
//TODO: Update EndOfPhase() to check if there are no actions left to make
const phases = ["ante", "preflop", "flop", "turn", "river"];
const handRanks = {
  "Royal Flush": 10,
  "Straight Flush": 9,
  "Four of a Kind": 8,
  "Full House": 7,
  Flush: 6,
  Straight: 5,
  "Three of a Kind": 4,
  "Two Pair": 3,
  "One Pair": 2,
  "High Card": 1,
};

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
    let playersWithBestHand = [];
    let winningHandRank = 0;

    this.players.forEach((player) => {
      if (!player.isPlaying) return;

      const hands = this.findHands(player.cards);
      const bestHand = this.findBestHand(hands);
      if (handRanks[bestHand] == winningHandRank) {
      }
    });

    return winnerId;
  }

  findBestHand(hands = {}) {
    const handKeys = Object.keys(hands);
    for (let i = 0; i < handKeys.length; i++) {
      if (hands[handKeys[i]] == true) {
        return handKeys[i];
      }
    }
  }

  findHands(cards = []) {
    if (cards.length != 2) {
      console.error(
        "Poker.bestHand() requires a 'cards' array argument with exactly 2 elements"
      );
    }

    const totalCards = [...this.commmunityCards, ...cards];
    let pokerHands = {
      "Royal Flush": 0,
      "Straight Flush": 0,
      "Four of a Kind": 0,
      "Full House": [],
      Flush: 0,
      Straight: 0,
      "Three of a Kind": 0,
      "Two Pair": [],
      "One Pair": 0,
      "High Card": 0,
    };

    //TODO: HighCard

    if (this.hasRoyalFlush(totalCards)) {
      pokerHands["Royal Flush"] = this.hasRoyalFlush(totalCards);
    } else if (this.hasStraightFlush(totalCards)) {
      pokerHands["Straight Flush"] = this.hasStraightFlush;
    } else if (this.hasFlush(totalCards)) {
      pokerHands["Flush"] = this.hasFlush(totalCards);
    } else if (this.hasStraight(totalCards)) {
      pokerHands["Straight"] = this.hasStraight(totalCards);
    }

    if (this.hasFourOfAKind(totalCards)) {
      pokerHands["Four of a Kind"] = this.hasFourOfAKind(totalCards);
      //create a copy of total cards
      //remove four of a kind from the copy
      const mostAbundantValue = this.findMostAbundantValue(totalCards);
      const cardsWithoutFourOfAKind = totalCards.filter(
        (card) => card.value != mostAbundantValue.value
      );

      //check if the remaining cards has a three of a kind or pair.
      if (this.hasThreeOfAKind(cardsWithoutFourOfAKind))
        pokerHands["Three of a Kind"] = this.hasThreeOfAKind(
          cardsWithoutFourOfAKind
        );
    } else if (this.hasFullHouse(totalCards)) {
      pokerHands["Full House"] = this.hasFullHouse(totalCards);

      //create a copy of total cards
      //remove full house from the copy
      const mostAbundantValue = this.findMostAbundantValue(totalCards);
      const cardsWithoutThreeOfAKind = totalCards.filter(
        (card) => card.value != mostAbundantValue.value
      );

      //check if the remaining cards has a pair
      if (this.hasPair(cardsWithoutThreeOfAKind))
        pokerHands["One Pair"] = this.hasPair(cardsWithoutThreeOfAKind);
    } else if (this.hasThreeOfAKind(totalCards)) {
      pokerHands["Three of a Kind"] = this.hasThreeOfAKind(totalCards);
    } else if (this.hasTwoPair(totalCards)) {
      pokerHands["Two Pair"] = this.hasTwoPair(totalCards);
    } else if (this.hasPair(totalCards)) {
      pokerHands["One Pair"] = this.hasPair(totalCards);
    }

    return pokerHands;
  }
  //TODO: refactor hand detection functions to return 0 if not found and else sum of all card values in that hand
  //hand detection
  hasRoyalFlush(cards = []) {
    const mostAbundantSuit = this.findMostAbundantSuit(cards);
    if (mostAbundantSuit.amount < 5) return 0;

    const flushCards = cards.filter(
      (card) => card.suit == mostAbundantSuit.suit
    );
    const flushCardValues = flushCards.map((card) => card.value);

    let royalCards = ["ACE", "KING", "QUEEN", "JACK", "10"];
    let royalFlushValue = 1;

    while (royalFlushValue != 0) {
      if (royalCards.length == 0) break;
      const nextCard = royalCards.pop();
      if (!flushCardValues.includes(nextCard)) royalFlushValue = 0;
    }

    return royalFlushValue;
  }

  hasStraightFlush(cards = []) {
    //check for flush
    const mostAbundantSuit = this.findMostAbundantSuit(cards);
    if (mostAbundantSuit.amount < 5) return 0;

    const flushCards = cards.filter(
      (card) => card.suit == mostAbundantSuit.suit
    );

    return this.hasStraight(flushCards);
  }

  hasFlush(cards = []) {
    //check for flush
    const mostAbundantSuit = this.findMostAbundantSuit(cards);
    if (mostAbundantSuit.amount < 5) return 0;

    const flushCards = cards.filter(
      (card) => card.suit == mostAbundantSuit.suit
    );

    let highestflushValue = 0;
    flushCards.forEach((card) => {
      const currentCardValue = this.cardValueToInt(card.value);
      if (currentCardValue > highestflushValue)
        highestflushValue = currentCardValue;
    });
    return highestflushValue;
  }

  hasStraight(cards = []) {
    //assign card values integer values
    let cardValues = cards.map((card) => this.cardValueToInt(card.value));

    //Ace can count as 1 or 14
    if (cardValues.includes(14)) cardValues.push(1);
    //sort high to low
    const sortedCardValues = cardValues.sort((a, b) => b - a);

    //check for straight
    for (let i = 0; i < sortedCardValues.length - 4; i++) {
      let straightValue = sortedCardValues[i];
      for (let j = 1; j < 5; j++) {
        if (sortedCardValues[i] - j != sortedCardValues[i + j]) break;
        if (j == 4) return straightValue;
      }
    }
    return 0;
  }

  hasFourOfAKind(cards = []) {
    const mostAbundantValue = this.findMostAbundantValue(cards);
    if (mostAbundantValue.amount != 4) return 0;
    return this.cardValueToInt(mostAbundantValue.value);
  }

  hasFullHouse(cards = []) {
    const mostAbundantValue = this.findMostAbundantValue(cards);
    if (mostAbundantValue.amount != 3) return [];

    //remove three of a kind to check for pair
    const cardsWithoutThreeOfAKind = cards.filter(
      (card) => card.value != mostAbundantValue.value
    );

    const nextMostAbundantValue = this.findMostAbundantValue(
      cardsWithoutThreeOfAKind
    );
    if (nextMostAbundantValue.amount != 2) return [];

    return [
      this.cardValueToInt(mostAbundantValue.value),
      this.cardValueToInt(nextMostAbundantValue.value),
    ];
  }

  hasThreeOfAKind(cards = []) {
    const mostAbundantValue = this.findMostAbundantValue(cards);
    if (mostAbundantValue.amount != 3) return 0;
    return this.cardValueToInt(mostAbundantValue.value);
  }

  hasTwoPair(cards = []) {
    //check for first pair
    const mostAbundantValue = this.findMostAbundantValue(cards);
    if (mostAbundantValue.amount != 2) return [];

    //remove first pair to check for second pair
    const cardsWithoutFirstPair = cards.filter(
      (card) => card.value != mostAbundantValue.value
    );
    const nextMostAbundantValue = this.findMostAbundantValue(
      cardsWithoutFirstPair
    );
    if (nextMostAbundantValue.amount != 2) return [];

    return [
      this.cardValueToInt(mostAbundantValue.value),
      this.cardValueToInt(nextMostAbundantValue.value),
    ];
  }

  hasPair(cards = []) {
    const mostAbundantValue = this.findMostAbundantValue(cards);
    if (mostAbundantValue.amount != 2) return 0;
    return mostAbundantValue.value;
  }

  cardValueToInt(value) {
    switch (value) {
      case "ACE":
        return 14;
      case "KING":
        return 13;
      case "QUEEN":
        return 12;
      case "JACK":
        return 11;
      default:
        return parseInt(value);
    }
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

  findMostAbundantValue(cards = []) {
    const foundValues = this.countCardValues(cards);
    //find most abundant value
    let mostValueName = "";
    let mostValueCount = 0;
    Object.keys(foundValues).forEach((suit) => {
      if (foundValues[suit] > mostValueCount) {
        mostValueCount = foundValues[suit];
        mostValueName = suit;
      }
    });
    return {
      value: mostValueName,
      amount: mostValueCount,
    };
  }

  countCardValues(cards = []) {
    //count all values
    let foundValues = {};
    cards.forEach((card) => {
      if (foundValues[card.value]) {
        foundValues[card.value]++;
      } else {
        foundValues = {
          ...foundValues,
          [card.value]: 1,
        };
      }
    });
    return foundValues;
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
