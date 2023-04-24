import Gameboard from './gameboard';

class Player {
  #enemy;

  constructor() {
    this.gameboard = new Gameboard();
  }

  set enemy(enemyPlayer) {
    this.#enemy = enemyPlayer;
  }

  get enemy() {
    return this.#enemy;
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

  static #randomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}

export default Player;
