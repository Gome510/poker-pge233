import { Poker } from "./components/Poker.js";

testAnteInAllPlayers();
testCpuAction();
testDealCommunityCards();
testMostAbundantSuitHEARTS();
testMostAbundantValue10();
testHasRoyalFlushTRUE();
testHasRoyalFlushFALSE();
testHasStraightFlushTRUE();
testHasStraightFlushFALSE();
testHasFlushTRUE();
testHasFlushFALSE();
testHasStraightTRUE();
testHasStraightFALSE();
testHasFourOfAKindTRUE();
testHasFourOfAKindFALSE();
testHasFullHouseTRUE();
testHasFullHouseFALSE();
testHasThreeOfAKindTRUE();
testHasThreeOfAKindFALSE();
testHasTwoPairTRUE();
testHasTwoPairFALSE();
testHasPairTRUE();
testHasPairFALSE();
testFindWinner();
testAwardWinners();

function testAnteInAllPlayers() {
  let pass = true;
  const game = new Poker();
  for (let i = 0; i < game.players.length; i++) {
    if (game.currentPlayer().isCPU) {
      game.cpuAction();
    } else {
      game.action("ante-in");
    }
  }

  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    if (player.balance != 9990) {
      console.log(
        `testAnteInAllPlayers: Error: Player ${player.seat}'s balance ${player.balance} after ante-in`
      );
      pass = false;
    }
  }

  console.log(`testAnteInAllPlayers: ${pass ? "Success" : "Failed"}`);
  return;
}

function testCpuAction(initialState = {}) {
  let game = new Poker(initialState);
  let pass = true;
  game.cpuAction();

  if (game.playerTurn != 1) {
    console.log(`testCpuAction: Error: playerTurn ${game.playerTurn}`);
    pass = false;
  }

  if (game.players[0].balance != 10000 - game.ante) {
    console.log(`testCpuAction: Error: player 1 balance ${game.playerTurn}`);
    pass = false;
  }

  console.log(`testCpuAction: ${pass ? "Success" : "Failed"}`);
}

function testDealCommunityCards() {
  const game = new Poker();
  let pass = true;

  game.nextPhase(); // pre-flop
  game.dealPlayerCards();

  game.nextPhase(); // flop
  game.dealCommunityCards();
  if (game.commmunityCards.length != 3) {
    console.log(
      `testDealCommunityCards: Error: # of community cards @ flop = ${game.commmunityCards.length}`
    );
    pass = false;
  }
  game.nextPhase(); // turn
  game.dealCommunityCards();
  if (game.commmunityCards.length != 4) {
    console.log(
      `testDealCommunityCards: Error: # of community cards @ turn = ${game.commmunityCards.length}`
    );
    pass = false;
  }
  game.nextPhase(); // river
  game.dealCommunityCards();
  if (game.commmunityCards.length != 5) {
    console.log(
      `testDealCommunityCards: Error: # of community cards @ river = ${game.commmunityCards.length}`
    );
    pass = false;
  }
  console.log(`testDealCommunityCards: ${pass ? "Success" : "Failed"}`);
  return;
}

function testAwardWinners() {
  const game = new Poker();
  let pass = true;

  game.commmunityCards = [
    {
      value: "9",
      suit: "CLUBS",
    },
    {
      value: "6",
      suit: "DIAMONDS",
    },
    {
      value: "9",
      suit: "SPADES",
    },
    {
      value: "KING",
      suit: "CLUBS",
    },
    {
      value: "2",
      suit: "HEARTS",
    },
  ];

  game.players[0].cards = [
    {
      value: "9",
      suit: "HEARTS",
    },
    {
      value: "9",
      suit: "DIAMONDS",
    },
  ];

  for (let i = 1; i < game.playerCount; i++) {
    game.players[i].cards = [
      {
        value: `${i + 1}`,
        suit: "SPADES",
      },
      {
        value: `${i + 1}`,
        suit: "CLUBS",
      },
    ];
  }

  const winners = game.findWinners();
  game.setPot(500);
  game.awardWinners(winners);

  if (winners[0].balance != 10500) {
    console.log(
      `testAwardWinners(): Error: Player balance is ${winner[0].balance}`
    );
    pass = false;
  }

  console.log(`testAwardWinners: ${pass ? "Success" : "Failed"}`);
  return;
}

function testFindWinner() {
  const game = new Poker();
  let pass = true;

  game.commmunityCards = [
    {
      value: "9",
      suit: "CLUBS",
    },
    {
      value: "6",
      suit: "DIAMONDS",
    },
    {
      value: "9",
      suit: "SPADES",
    },
    {
      value: "KING",
      suit: "CLUBS",
    },
    {
      value: "2",
      suit: "HEARTS",
    },
  ];

  game.players[0].cards = [
    {
      value: "9",
      suit: "HEARTS",
    },
    {
      value: "9",
      suit: "DIAMONDS",
    },
  ];

  for (let i = 1; i < game.playerCount; i++) {
    game.players[i].cards = [
      {
        value: `${i + 1}`,
        suit: "SPADES",
      },
      {
        value: `${i + 1}`,
        suit: "CLUBS",
      },
    ];
  }

  const winner = game.findWinners();

  if (winner[0].seat != 1) {
    console.log(
      `testFindWinner(): Error: Winner reported as Player ${winner[0].seat}`
    );
    pass = false;
  }

  console.log(`testFindWinner: ${pass ? "Success" : "Failed"}`);
  return;
}

function testMostAbundantSuitHEARTS() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "JACK", suit: "HEARTS" },
    { value: "10", suit: "HEARTS" },
    { value: "10", suit: "SPADES" },
    { value: "10", suit: "DIAMONDS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.findMostAbundantSuit(totalCards);

  if (result.suit != "HEARTS") {
    console.log(
      `testMostAbundantSuitHEARTS: Error: most abundant suit was ${result.suit}`
    );
    pass = false;
  }

  console.log(`testMostAbundantSuitHEARTS: ${pass ? "Success" : "Failed"}`);
  return;
}

function testMostAbundantValue10() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "JACK", suit: "HEARTS" },
    { value: "10", suit: "HEARTS" },
    { value: "10", suit: "SPADES" },
    { value: "10", suit: "DIAMONDS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.findMostAbundantValue(totalCards);

  if (result.value != "10") {
    console.log(
      `testMostAbundantValue10: Error: most abundant value was ${result.suit}`
    );
    pass = false;
  }

  console.log(`testMostAbundantValue10: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasRoyalFlushTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "JACK", suit: "HEARTS" },
    { value: "10", suit: "HEARTS" },
    { value: "10", suit: "SPADES" },
    { value: "10", suit: "DIAMONDS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasRoyalFlush(totalCards);

  if (result != 1) {
    console.log(`testHasRoyalFlushTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasRoyalFlushTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasRoyalFlushFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "SPADES" },
    { value: "JACK", suit: "SPADES" },
    { value: "10", suit: "HEARTS" },
    { value: "10", suit: "SPADES" },
    { value: "10", suit: "DIAMONDS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasRoyalFlush(totalCards);

  if (result != 0) {
    console.log(`testHasRoyalFlushFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasRoyalFlushFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasStraightFlushTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "5", suit: "HEARTS" },
    { value: "4", suit: "HEARTS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "HEARTS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasStraightFlush(totalCards);

  if (result != 5) {
    console.log(`testHasStraightFlushTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasStraightFlushTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasStraightFlushFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "6", suit: "HEARTS" },
    { value: "4", suit: "HEARTS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "HEARTS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasStraightFlush(totalCards);

  if (result != 0) {
    console.log(`testHasStraightFlushFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasStraightFlushFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFlushTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "6", suit: "HEARTS" },
    { value: "4", suit: "HEARTS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "HEARTS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFlush(totalCards);

  if (result != 14) {
    console.log(`testHasFlushTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFlushTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFlushFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "6", suit: "SPADES" },
    { value: "4", suit: "SPADES" },
    { value: "3", suit: "SPADES" },
    { value: "2", suit: "HEARTS" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "HEARTS" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFlush(totalCards);

  if (result != 0) {
    console.log(`testHasFlushFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFlushFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasStraightTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "5", suit: "HEARTS" },
    { value: "4", suit: "HEARTS" },
    { value: "3", suit: "SPADES" },
    { value: "2", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasStraight(totalCards);

  if (result != 5) {
    console.log(`testHasStraightTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasStraightTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasStraightFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "5", suit: "HEARTS" },
    { value: "4", suit: "HEARTS" },
    { value: "7", suit: "SPADES" },
    { value: "2", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "ACE", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasStraight(totalCards);

  if (result != 0) {
    console.log(`testHasStraightFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasStraightFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFourOfAKindTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "2", suit: "HEARTS" },
    { value: "2", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFourOfAKind(totalCards);

  if (result != 2) {
    console.log(`testHasFourOfAKindTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFourOfAKindTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFourOfAKindFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFourOfAKind(totalCards);

  if (result != 0) {
    console.log(`testHasFourOfAKindFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFourOfAKindFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFullHouseTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFullHouse(totalCards);

  if (result[0] != 2 || result[1] != 3) {
    console.log(`testHasFullHouseTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFullHouseTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasFullHouseFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "DIAMONDS" },
    { value: "4", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasFullHouse(totalCards);

  if (result.length != 0) {
    console.log(`testHasFullHouseFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasFullHouseFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasThreeOfAKindTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "2", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasThreeOfAKind(totalCards);

  if (result != 2) {
    console.log(`testHasThreeOfAKindTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasThreeOfAKindTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasThreeOfAKindFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "2", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "4", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasThreeOfAKind(totalCards);

  if (result != 0) {
    console.log(`testHasThreeOfAKindFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasThreeOfAKindFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasTwoPairTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "1", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "1", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasTwoPair(totalCards);

  if (result != 3) {
    console.log(`testHasTwoPairTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasTwoPairTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasTwoPairFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "1", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "1", suit: "DIAMONDS" },
    { value: "5", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasTwoPair(totalCards);

  if (result != 0) {
    console.log(`testHasTwoPairFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasTwoPairFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasPairTRUE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "5", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "1", suit: "DIAMONDS" },
    { value: "3", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasPair(totalCards);

  if (result != 3) {
    console.log(`testHasPairTRUE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasPairTRUE: ${pass ? "Success" : "Failed"}`);
  return;
}

function testHasPairFALSE() {
  let pass = true;
  let game = new Poker();
  game.commmunityCards = [
    { value: "QUEEN", suit: "HEARTS" },
    { value: "5", suit: "CLUBS" },
    { value: "3", suit: "HEARTS" },
    { value: "1", suit: "DIAMONDS" },
    { value: "7", suit: "SPADES" },
  ];
  game.players[0].cards = [
    { value: "2", suit: "SPADES" },
    { value: "KING", suit: "HEARTS" },
  ];
  const totalCards = [...game.commmunityCards, ...game.players[0].cards];

  const result = game.hasPair(totalCards);

  if (result != 0) {
    console.log(`testHasPairFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasPairFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}
