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
  test('direct hit returns true and marks square as successful attack', () => {
    const newBoard = new Gameboard();
    const result = newBoard.placeShip(0, [2, 2], true);
    expect(result).toBe(true);
    expect(newBoard.receiveAttack([2, 3])).toBe(true);
    const { board } = newBoard;
    expect(board[2][3].attackResult).toBe(true);
  });

  test('second attempt on successful hit returns false', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(0, [2, 2], true);
    expect(newBoard.receiveAttack([2, 3])).toBe(true);
    expect(newBoard.receiveAttack([2, 3])).toBe(false);
  });

  test('attack on empty square returns true and marks square as missed attack', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(0, [2, 2], true);
    expect(newBoard.receiveAttack([4, 3])).toBe(true);
    const { board } = newBoard;
    expect(board[4][3].attackResult).toBe(false);
  });

  test('attack on neighboring square returns true and marks square without deleting neighbor key', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(0, [2, 2], true);
    newBoard.placeShip(1, [4, 2], true);
    expect(newBoard.receiveAttack([3, 3])).toBe(true);
    const { board } = newBoard;
    expect(board[3][3].attackResult).toBe(false);
    expect(board[3][3].neighbor).toContain(0);
    expect(board[3][3].neighbor).toContain(1);
  });
});

describe('allSunk tests', () => {
  test('reports true after 1/1 ship sunk', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(1, [2, 2], true);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 2]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 3]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 4]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 5]);
    expect(newBoard.allSunk()).toBe(true);
  });

  test('reports true after 5/5 ship sunk', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(0, [2, 2], true);
    newBoard.placeShip(1, [4, 4], false);
    newBoard.placeShip(2, [2, 9], false);
    newBoard.placeShip(3, [8, 2], true);
    newBoard.placeShip(4, [9, 7], true);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 2]);
    newBoard.receiveAttack([2, 3]);
    newBoard.receiveAttack([2, 4]);
    newBoard.receiveAttack([2, 5]);
    newBoard.receiveAttack([2, 6]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([4, 4]);
    newBoard.receiveAttack([5, 4]);
    newBoard.receiveAttack([6, 4]);
    newBoard.receiveAttack([7, 4]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([2, 9]);
    newBoard.receiveAttack([3, 9]);
    newBoard.receiveAttack([4, 9]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([8, 2]);
    newBoard.receiveAttack([8, 4]);
    newBoard.receiveAttack([8, 5]);
    expect(newBoard.allSunk()).toBe(false);
    newBoard.receiveAttack([9, 7]);
    newBoard.receiveAttack([9, 8]);
    expect(newBoard.allSunk()).toBe(true);
  });
});

describe('allPlaced tests', () => {
  test('reports true after all five ships placed', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(0, [2, 2], true);
    expect(newBoard.allPlaced()).toBe(false);
    newBoard.placeShip(1, [5, 7], false);
    expect(newBoard.allPlaced()).toBe(false);
    newBoard.placeShip(2, [0, 0], false);
    expect(newBoard.allPlaced()).toBe(false);
    newBoard.placeShip(3, [4, 4], false);
    expect(newBoard.allPlaced()).toBe(false);
    newBoard.placeShip(4, [9, 4], true);
    expect(newBoard.allPlaced()).toBe(true);
  });
});
