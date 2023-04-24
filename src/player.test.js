import Player from './player';

test('enemy getter and setter work', () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.enemy = player2;
  player2.enemy = player1;
  expect(player1.enemy).toBe(player2);
  expect(player2.enemy).toBe(player1);
});

test('makeMove returns true on a successful attack', () => {
  const player1 = new Player(true);
  const player2 = new Player(false);
  player1.enemy = player2;
  player2.enemy = player1;
  const result = player1.makeMove([2, 2]);
  expect(result).toBe(true);
  expect(player2.gameboard.board[2][2].attackResult).toBe(false);
});

test('randomMove returns true on successful attack', () => {
  const player1 = new Player(true);
  const player2 = new Player(false);
  player1.enemy = player2;
  player2.enemy = player1;
  const result = player1.randomMove();
  expect(result).toBe(true);
});
