import GameController from './gameController';

class ScreenController {
  constructor() {
    this.game = new GameController();
    this.init();
    this.placeShips();
    this.renderBoard(this.game.player1);
    this.renderBoard(this.game.player2);
    this.setTurnHandler();
  }

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('main');

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

    const userHeading = document.createElement('h3');
    userHeading.textContent = 'Player Board';
    const userBoard = this.createBoard(true);
    userBoard.classList.add('user-board');
    userContainer.appendChild(userHeading);
    userContainer.appendChild(userBoard);

    const opponentHeading = document.createElement('h3');
    opponentHeading.textContent = 'PC Board';
    const opponentBoard = this.createBoard(false);
    opponentBoard.classList.add('opponent-board');
    opponentContainer.appendChild(opponentHeading);
    opponentContainer.appendChild(opponentBoard);

    boardsContainer.appendChild(userContainer);
    boardsContainer.appendChild(opponentContainer);

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    this.status = document.createElement('h2');
    this.status.classList.add('game-status');
    this.status.textContent = 'Place ships...';
    statusContainer.appendChild(this.status);

    this.main.appendChild(headingContainer);
    this.main.appendChild(boardsContainer);
    this.main.appendChild(statusContainer);
    document.body.appendChild(this.main);
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
        if (cellForRender === 1 && isPlayer1) {
          boardElements[i][j].classList.add('ship');
        } else if (cellForRender === 2) {
          boardElements[i][j].classList.add('hit');
        } else if (cellForRender === 3) {
          boardElements[i][j].classList.add('miss');
        } else if (cellForRender === 4) {
          boardElements[i][j].classList.add('revealed');
        }
      }
    }
  }

  setTurnHandler() {
    this.opponentBoard.forEach((arr) => {
      arr.forEach((cell) => {
        cell.addEventListener('click', this.playerClick.bind(this));
      });
    });
  }

  playerClick(e) {
    if (!this.game.gameOver) {
      const coordinates = [e.target.dataset.row, e.target.dataset.col];
      if (this.game.player1.makeMove(coordinates)) {
        this.renderBoard(this.game.player2);
        this.game.player2.randomMove();
        this.renderBoard(this.game.player1);
      }

      if (this.game.isGameOver()) {
        this.main.classList.add('game-over');
        this.status.textContent = `Game Over, ${this.game.gameOver === this.game.player1 ? 'You' : 'PC'} won!`;
      }
    }
  }
}

export default ScreenController;
