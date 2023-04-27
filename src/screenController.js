import GameController from './gameController';

class ScreenController {
  constructor() {
    this.game = new GameController();
    this.init();
    this.placeShips();
    this.renderBoard(this.game.player1);
    this.renderBoard(this.game.player2);
    this.setClickHandlers();
  }

  init() {
    const main = document.createElement('div');
    main.classList.add('main');

    const headingContainer = document.createElement('div');
    headingContainer.classList.add('heading-container');
    const mainHeading = document.createElement('h1');
    mainHeading.classList.add('main-heading');
    mainHeading.textContent = 'Battleship';
    headingContainer.appendChild(mainHeading);

    const boardsContainer = document.createElement('div');
    boardsContainer.classList.add('boards-container');
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');
    const opponentContainer = document.createElement('div');
    opponentContainer.classList.add('opponent-container');

    const userHeading = document.createElement('h2');
    userHeading.textContent = 'Player Board';
    const userBoard = this.createBoard(true);
    userBoard.classList.add('user-board');
    userContainer.appendChild(userHeading);
    userContainer.appendChild(userBoard);

    const opponentHeading = document.createElement('h2');
    opponentHeading.textContent = 'PC Board';
    const opponentBoard = this.createBoard(false);
    opponentBoard.classList.add('opponent-board');
    opponentContainer.appendChild(opponentHeading);
    opponentContainer.appendChild(opponentBoard);

    boardsContainer.appendChild(userContainer);
    boardsContainer.appendChild(opponentContainer);

    main.appendChild(headingContainer);
    main.appendChild(boardsContainer);
    document.body.appendChild(main);
  }

  createBoard(isUser) {
    const cells = [...new Array(10)].map((x) => [...new Array(10)]);
    const board = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells[i][j] = cell;
        board.appendChild(cell);
      }
    }
    if (isUser) {
      this.playerBoard = cells;
    } else {
      this.opponentBoard = cells;
    }
    return board;
  }

  placeShips() {
    this.game.player1.testPlace();
    this.game.player2.testPlace();
  }

  renderBoard(player) {
    const isPlayer1 = player === this.game.player1;
    const boardState = isPlayer1
      ? this.game.player1.gameboard
      : this.game.player2.gameboard;

    const boardElements = isPlayer1
      ? this.playerBoard
      : this.opponentBoard;

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        // 0 - empty, 1 - ship, 2 - hit, 3 - miss, 4 - revealed
        const cellForRender = boardState.getCellForRender([i, j]);
        if (cellForRender) {
          if (isPlayer1) {
            boardElements[i][j].textContent = cellForRender;
          } else if (cellForRender !== 1) {
            boardElements[i][j].textContent = cellForRender;
          }
        }
      }
    }
  }

  setClickHandlers() {

  }
}

export default ScreenController;
