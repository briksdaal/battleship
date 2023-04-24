import Gameboard from './gameboard';

describe('basic board tests', () => {
  test('gameboard size is 10 by 10', () => {
    const newBoard = new Gameboard();
    const { board } = newBoard;
    expect(board.length).toBe(10);
    for (let i = 0; i < 10; i += 1) {
      expect(board[i].length).toBe(10);
    }
  });

  test('new gameboard is all null values', () => {
    const newBoard = new Gameboard();
    const { board } = newBoard;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        expect(board[i][j]).toBeNull();
      }
    }
  });
});

describe('placeShip tests', () => {
  test('new ship is positioned successfully', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(0, [0, 0], true);
    expect(result).toBe(true);
    const { board } = newBoard;
    expect(board[0][0].name).toBe('Carrier');
    expect(board[0][1].name).toBe('Carrier');
    expect(board[0][2].name).toBe('Carrier');
    expect(board[0][3].name).toBe('Carrier');
    expect(board[0][4].name).toBe('Carrier');
  });

  test('illegal ship id makes placeShip return false and doesn\'t change board', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(-4, [2, 5], true);
    expect(result).toBe(false);
    const { board } = newBoard;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        expect(board[i][j]).toBeNull();
      }
    }
  });

  test('insufficient space for ship makes placeShip return false and doesn\'t change board', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(3, [9, 8], true);
    expect(result).toBe(false);
    const { board } = newBoard;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        expect(board[i][j]).toBeNull();
      }
    }
  });

  test('squares around ship are marked as neighboring', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(1, [2, 2], true);
    expect(result).toBe(true);
    const { board } = newBoard;
    expect(board[1][1].neighbor).toContain(1);
    expect(board[1][2].neighbor).toContain(1);
    expect(board[1][3].neighbor).toContain(1);
    expect(board[1][4].neighbor).toContain(1);
    expect(board[1][5].neighbor).toContain(1);
    expect(board[1][6].neighbor).toContain(1);
    expect(board[2][1].neighbor).toContain(1);
    expect(board[2][6].neighbor).toContain(1);
    expect(board[3][1].neighbor).toContain(1);
    expect(board[3][2].neighbor).toContain(1);
    expect(board[3][3].neighbor).toContain(1);
    expect(board[3][4].neighbor).toContain(1);
    expect(board[3][5].neighbor).toContain(1);
    expect(board[3][6].neighbor).toContain(1);
  });

  test('can\'t place ships on or adjacent to each other', () => {
    const newBoard = new Gameboard();
    let result = newBoard.placeShip(0, [2, 2], true);
    expect(result).toBe(true);
    result = newBoard.placeShip(1, [2, 2], true);
    expect(result).toBe(false);
    result = newBoard.placeShip(2, [3, 2], true);
    expect(result).toBe(false);
    result = newBoard.placeShip(3, [3, 3], false);
    expect(result).toBe(false);
  });

  test('neighboring square to two ships contains both ids', () => {
    const newBoard = new Gameboard();
    let result = newBoard.placeShip(0, [2, 2], true);
    expect(result).toBe(true);
    result = newBoard.placeShip(3, [4, 3], false);
    expect(result).toBe(true);
    const { board } = newBoard;
    expect(board[3][3].neighbor).toContain(0);
    expect(board[3][3].neighbor).toContain(3);
  });
});

describe('receiveAttack tests', () => {
  test('direct hit returns true and marks square', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(0, [2, 2], true);
    expect(result).toBe(true);
    expect(newBoard.receiveAttack([2, 3])).toBe(true);
    const { board } = newBoard;
    expect(board[2][3].hit).toBe(true);
  });

  test('second attempt on successful hit returns false', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(0, [2, 2], true);
    expect(result).toBe(true);
    expect(newBoard.receiveAttack([2, 3])).toBe(true);
    const { board } = newBoard;
    expect(board[2][3].hit).toBe(true);
  });
});
