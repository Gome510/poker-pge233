import { Poker } from "./components/Poker.js";

testAnteInAllPlayers();
testCpuAction();

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
