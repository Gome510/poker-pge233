import { Poker } from "./components/Poker.js";

testAnteInAllPlayers();
testCpuAction();
testDealCommunityCards();
testMostAbundantSuitHEARTS();
testHasRoyalFlushTRUE();
testHasRoyalFlushFALSE();
testHasStraightFlushTRUE();
testHasStraightFlushFALSE();
testHasFlushTRUE();
testHasFlushFALSE();
testHasStraightTRUE();
testHasStraightFALSE();

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

function testFindWinner() {
  const game = new Poker();

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

  for (let i = 1; i < game.playerCount(); i++) {
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

  //const winner = game.findWinner()
  if (winner != 1) {
    console.log(`testFindWinner(): Error: Winner reported as Player ${winner}`);
  }
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

  if (result == false) {
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

  if (result == true) {
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

  if (result == false) {
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

  if (result == true) {
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

  if (result == false) {
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

  if (result == true) {
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

  if (result == false) {
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

  if (result == true) {
    console.log(`testHasStraightFALSE: Error: The result was ${result}`);
    pass = false;
  }

  console.log(`testHasStraightFALSE: ${pass ? "Success" : "Failed"}`);
  return;
}
