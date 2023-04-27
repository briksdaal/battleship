import Player from './player';
import GameController from './gameController';

test('a new game is created with two players and ready with human active player', () => {
  const game = new GameController();
  expect(game.player1 instanceof Player).toBe(true);
  expect(game.player2 instanceof Player).toBe(true);
  expect(game.player1.enemy).toBe(game.player2);
  expect(game.player2.enemy).toBe(game.player1);
});
