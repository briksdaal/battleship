import Gameboard from './gameboard';

class Player {
  #isHuman;

  #enemy;

  #potentialMoves;

  constructor(isHuman) {
    this.#isHuman = isHuman;
    this.gameboard = new Gameboard();
    this.#potentialMoves = [];
    this.smell = null;
  }

  set enemy(enemyPlayer) {
    this.#enemy = enemyPlayer;
  }

  get enemy() {
    return this.#enemy;
  }

  get isHuman() {
    return this.#isHuman;
  }

  reset() {
    this.#potentialMoves = [];
    this.smell = null;
    this.gameboard.reset();
  }

  #getLastEvent() {
    return this.#enemy.gameboard.lastEvent;
  }

  makeMove(coordinates) {
    if (!(this.enemy instanceof Player)) {
      return false;
    }

    return this.enemy.gameboard.receiveAttack(coordinates);
  }

  randomMove() {
    let needToMove = true;

    while (needToMove) {
      needToMove = !this.makeMove(Player.#randomCoordinates());
    }

    return true;
  }

  pcMove() {
    const lastEvent = this.#getLastEvent();

    if (lastEvent === null) {
      this.randomMove();
    } else if (lastEvent.type === 2) {
      this.smell = null;
      this.#potentialMoves = [];
      this.randomMove();
    } else if (lastEvent.type === 0) {
      if (this.#potentialMoves.length === 0) {
        this.randomMove();
      } else {
        this.#tryPotentials();
      }
    } else if (lastEvent.type === 1) {
      const [x, y] = lastEvent.coordinates;
      this.#potentialMoves.push([x - 1, y]);
      this.#potentialMoves.push([x + 1, y]);
      this.#potentialMoves.push([x, y - 1]);
      this.#potentialMoves.push([x, y + 1]);
      if (!this.smell) {
        this.smell = lastEvent.coordinates;
      } else if (this.smell[0] === x) {
        this.#potentialMoves = this.#potentialMoves.filter((coor) => coor[0] === x);
      } else if (this.smell[1] === y) {
        this.#potentialMoves = this.#potentialMoves.filter((coor) => coor[1] === y);
      }
      this.#tryPotentials();
    }
  }

  #tryPotentials() {
    let coordinates;
    do {
      coordinates = this.#potentialMoves.pop();
    } while (!this.makeMove(coordinates));
  }

  randomPlace() {
    for (let i = 0; i < 5; i += 1) {
      let needToPlace = true;

      while (needToPlace) {
        needToPlace = !this.gameboard.placeShip(
          i,
          Player.#randomCoordinates(),
          Player.#randomBoolean(),
        );
      }
    }
    return true;
  }

  testPlace() {
    this.gameboard.placeShip(0, [0, 1], true);
    this.gameboard.placeShip(1, [2, 0], true);
    this.gameboard.placeShip(2, [2, 6], false);
    this.gameboard.placeShip(3, [4, 4], false);
    this.gameboard.placeShip(4, [8, 8], true);
  }

  static #randomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  static #randomBoolean() {
    return Math.floor(Math.random() * 2) === 0;
  }
}

export default Player;
