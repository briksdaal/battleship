import Player from './player';
import GameController from './gameController';

test('a new game is created with two players and ready with human active player', () => {
  const game = new GameController();
  expect(game.player1 instanceof Player).toBe(true);
  expect(game.player2 instanceof Player).toBe(true);
  expect(game.player1.enemy).toBe(game.player2);
  expect(game.player2.enemy).toBe(game.player1);
});

test('game over when 1/1 ships are sunk', () => {
  const game = new GameController();
  expect(game.isGameOver()).toBeFalsy();
  game.player1.gameboard.placeShip(4, [0, 0], true);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.gameboard.placeShip(4, [1, 0], true);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([1, 0]);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([1, 1]);
  expect(game.isGameOver()).toBeTruthy();
  expect(game.isGameOver()).toBe(game.player1);
});

test('game over when 2/2 ships are sunk', () => {
  const game = new GameController();
  game.player1.gameboard.placeShip(4, [0, 0], true);
  game.player1.gameboard.placeShip(3, [2, 0], true);
  game.player2.gameboard.placeShip(4, [1, 0], true);
  game.player2.gameboard.placeShip(3, [3, 0], true);

  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([0, 0]);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.makeMove([0, 0]);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([0, 1]);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.makeMove([0, 1]);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([2, 0]);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.makeMove([2, 0]);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([2, 1]);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.makeMove([2, 1]);
  expect(game.isGameOver()).toBeFalsy();
  game.player1.makeMove([2, 2]);
  expect(game.isGameOver()).toBeFalsy();
  game.player2.makeMove([2, 2]);
  expect(game.isGameOver()).toBeTruthy();
  expect(game.isGameOver()).toBe(game.player2);
});
