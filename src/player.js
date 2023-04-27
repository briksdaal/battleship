import Gameboard from './gameboard';

class Player {
  #isHuman;

  #enemy;

  constructor(isHuman) {
    this.#isHuman = isHuman;
    this.gameboard = new Gameboard();
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
