import GameController from './gameController';

class ScreenController {
  constructor() {
    this.game = new GameController();
    this.init();
    this.placeShips();
    this.renderPlayerBoard();
    this.renderOpponentBoard();
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
    this.game.player2.randomPlace();
  }

  renderPlayerBoard() {
    const boardState = this.game.player1.gameboard;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (boardState.isShip([i, j])) {
          this.playerBoard[i][j].textContent = 'X';
        }
      }
    }
  }

  renderOpponentBoard() {
    const boardState = this.game.player2.gameboard;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (boardState.isShip([i, j])) {
          this.opponentBoard[i][j].textContent = 'X';
        }
      }
    }
  }

  setClickHandlers() {

  }
}

export default ScreenController;
