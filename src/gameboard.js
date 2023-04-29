import Ship from './ship';

class Gameboard {
  #lastEvent;

  #board;

  #boardShips = [];

  constructor() {
    this.#board = [...new Array(10)].map(() => [...new Array(10)].map(() => null));
    this.#lastEvent = null;
  }

  get board() {
    return this.#board;
  }

  // ship id, coordinates, true  = horizontal position / false = vertical position
  placeShip(id, coordinates, horizontal = true) {
    const ship = new Ship(id);

    if (ship.id === -1 || !this.isLegalPlacement(ship.length, coordinates, horizontal)) {
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

    this.#boardShips.push(ship);

    return true;
  }

  isShip(coordinates) {
    const [x, y] = coordinates;

    return this.#board[x][y] instanceof Ship;
  }

  receiveAttack(coordinates) {
    // coordinates out of board - return false
    if (!Gameboard.#isInBoard(coordinates)) {
      return false;
    }

    const [x, y] = coordinates;

    // coordinates are of an attack already received - return false
    if (this.#board[x][y] !== null && ('attackResult' in this.#board[x][y] || this.#board[x][y].revealed === true)) {
      return false;
    }

    this.#lastEvent = { coordinates, type: 0 };

    if (this.isShip(coordinates)) {
      const ship = this.#board[x][y];
      ship.hit();
      this.#board[x][y] = { attackResult: true };
      this.#lastEvent.type = 1;

      if (ship.isSunk()) {
        this.#revealNeighbors(ship);
        this.#lastEvent.type = 2;
      }
    } else if (this.#board[x][y] === null) {
      this.#board[x][y] = { attackResult: false };
    } else {
      this.#board[x][y].attackResult = false;
    }

    return true;
  }

  allSunk() {
    return this.#boardShips.length > 0
    && this.#boardShips.every((singleShip) => singleShip.isSunk());
  }

  allPlaced() {
    return (this.#boardShips.length === 5)
    && (this.#boardShips.some((singleShip) => singleShip.id === 0))
    && (this.#boardShips.some((singleShip) => singleShip.id === 1))
    && (this.#boardShips.some((singleShip) => singleShip.id === 2))
    && (this.#boardShips.some((singleShip) => singleShip.id === 3))
    && (this.#boardShips.some((singleShip) => singleShip.id === 4));
  }

  getCellForRender(coordinates) {
    // 0 - empty, 1 - ship, 2 - hit, 3 - miss, 4 - revealed
    const [x, y] = coordinates;
    const cell = this.#board[x][y];

    let result;

    if (cell === null) {
      result = 0;
    } else if (this.isShip(coordinates)) {
      result = 1;
    } else if ('attackResult' in cell && cell.attackResult === true) {
      result = 2;
    } else if ('attackResult' in cell && cell.attackResult === false) {
      result = 3;
    } else if (cell.revealed === true) {
      result = 4;
    } else {
      result = 0;
    }

    return result;
  }

  isLegalPlacement(length, coordinates, horizontal) {
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

  reset() {
    this.#board = this.#board.map((arr) => arr.map(() => null));
    this.#boardShips = [];
    this.#lastEvent = null;
  }

  get lastEvent() {
    return this.#lastEvent;
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

  #revealNeighbors(ship) {
    const shipId = ship.id;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (this.#board[i][j] !== null
          && this.#board[i][j].neighbor
          && this.#board[i][j].neighbor.includes(shipId)) {
          this.#board[i][j].revealed = true;
        }
      }
    }
  }
}

export default Gameboard;
