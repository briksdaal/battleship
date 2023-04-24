import Ship from './ship';

class Gameboard {
  #board;

  constructor() {
    this.#board = [...new Array(10)].map(() => [...new Array(10)].map(() => null));
  }

  get board() {
    return this.#board;
  }

  // ship id, coordinates, true  = horizontal position / false = vertical position
  placeShip(id, coordinates, horizontal = true) {
    const ship = new Ship(id);

    if (ship.id === -1 || !this.#isLegalPlacement(ship.length, coordinates, horizontal)) {
      return false;
    }

    const [x, y] = coordinates;
    const untilX = horizontal ? x + 1 : x + ship.length;
    const untilY = !horizontal ? y + 1 : y + ship.length;

    for (let i = x; i < untilX; i += 1) {
      for (let j = y; j < untilY; j += 1) {
        this.#board[i][j] = ship;
      }
    }

    this.#markNeighboringSquares(ship.length, coordinates, horizontal, id);

    return true;
  }

  receiveAttack(coordinates) {
    if (!Gameboard.#isInBoard(coordinates)) {
      return false;
    }

    const [x, y] = coordinates;
    if (this.#board[x][y] instanceof Ship) {
      this.#board[x][y].hit();
      this.#board[x][y] = { hit: true };
    } else {
      this.#board[x][y] = { hit: false };
    }

    return true;
  }

  #isLegalPlacement(length, coordinates, horizontal) {
    const [x, y] = coordinates;
    const untilX = horizontal ? x + 1 : x + length;
    const untilY = !horizontal ? y + 1 : y + length;

    for (let i = x; i < untilX; i += 1) {
      for (let j = y; j < untilY; j += 1) {
        if (!Gameboard.#isInBoard([i, j]) || this.#isEmpty([i, j])) {
          return false;
        }
      }
    }
    return true;
  }

  static #isInBoard(coordinates) {
    const [x, y] = coordinates;
    return (x >= 0 && x < 10) && (y >= 0 && y < 10);
  }

  #isEmpty(coordinates) {
    const [x, y] = coordinates;
    return this.#board[x][y];
  }

  #markNeighboringSquares(length, coordinates, horizontal, id) {
    const [x, y] = coordinates;
    const untilX = horizontal ? x + 1 : x + length;
    const untilY = !horizontal ? y + 1 : y + length;

    for (let i = x - 1; i < untilX + 1; i += 1) {
      for (let j = y - 1; j < untilY + 1; j += 1) {
        if (Gameboard.#isInBoard([i, j])
        && (i === x - 1 || i === untilX || j === y - 1 || j === untilY)) {
          if (!this.#isEmpty([i, j])) {
            this.#board[i][j] = { neighbor: [] };
          }
          this.#board[i][j].neighbor.push(id);
        }
      }
    }
  }
}

export default Gameboard;
