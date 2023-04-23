class Ship {
  #name;

  #length;

  #hits;

  constructor(id) {
    if (Number.isInteger(id) && id >= 0 && id < 5) {
      [this.#name, this.#length] = Ship.#ships[id];
      this.#hits = 0;
    } else {
      this.#name = 'Illegal ship';
      this.#length = 0;
      this.#hits = 0;
    }
  }

  getLength() {
    return this.#length;
  }

  getName() {
    return this.#name;
  }

  getHits() {
    return this.#hits;
  }

  hit() {
    if (this.#hits === this.#length) {
      return;
    }
    this.#hits += 1;
  }

  isSunk() {
    return (this.#hits === this.#length);
  }

  static #ships = [
    ['Carrier', 5],
    ['Battleship', 4],
    ['Destroyer', 3],
    ['Submarine', 3],
    ['Patrol Boat', 2],
  ];
}

export default Ship;
