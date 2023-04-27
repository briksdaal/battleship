import Player from './player';

class GameController {
  #player1;

  #player2;

  constructor() {
    this.#player1 = new Player(true);
    this.#player2 = new Player(false);
    this.#player1.enemy = this.#player2;
    this.#player2.enemy = this.#player1;
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }
}

export default GameController;
