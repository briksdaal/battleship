import Player from './player';

test('constructor isHuman flag works', () => {
  const player1 = new Player(true);
  const player2 = new Player(false);
  expect(player1.isHuman).toBe(true);
  expect(player2.isHuman).toBe(false);
});

test('enemy getter and setter work', () => {
  const player1 = new Player(true);
  const player2 = new Player(false);
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

test('can target the entire board with randomMove', () => {
  const player1 = new Player(true);
  const player2 = new Player(false);
  player1.enemy = player2;
  player2.enemy = player1;
  for (let i = 0; i < 100; i += 1) {
    const result = player1.randomMove();
    expect(result).toBe(true);
  }
});

test('computer can place all 5 ships', () => {
  const player = new Player(false);
  expect(player.gameboard.allPlaced()).toBe(false);
  player.randomPlace();
  expect(player.gameboard.allPlaced()).toBe(true);
});

test('test placing places all 5 ships', () => {
  const player = new Player(false);
  expect(player.gameboard.allPlaced()).toBe(false);
  player.testPlace();
  expect(player.gameboard.allPlaced()).toBe(true);
});
