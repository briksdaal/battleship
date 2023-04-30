import { mdiRefresh, mdiGithub } from '@mdi/js';
import createSvg from './createSvg';
import GameController from './gameController';

class ScreenController {
  constructor() {
    this.game = new GameController();
    this.createElements();
    this.placeShips();
  }

  createElements() {
    // main container
    this.main = document.createElement('div');
    this.main.className = 'main';

    // heading container
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('heading-container');
    const mainHeading = document.createElement('h1');
    mainHeading.classList.add('main-heading');
    mainHeading.textContent = 'Battleship';
    headingContainer.appendChild(mainHeading);

    // board containers
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

    // status text container
    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    this.status = document.createElement('h2');
    this.status.classList.add('game-status');
    statusContainer.appendChild(this.status);

    // footer container
    const footerContainer = document.createElement('div');
    footerContainer.classList.add('footer');
    const para = document.createElement('p');
    para.textContent = `Copyright © ${new Date().getFullYear()} Briksdaal `;
    const ghLink = document.createElement('a');
    ghLink.setAttribute('href', 'https://github.com/briksdaal');
    ghLink.setAttribute('target', '_blank');
    ghLink.appendChild(createSvg(mdiGithub));
    para.appendChild(ghLink);
    footerContainer.appendChild(para);

    // append all to main
    this.main.appendChild(headingContainer);
    this.main.appendChild(boardsContainer);
    this.main.appendChild(statusContainer);
    this.main.appendChild(footerContainer);
    document.body.appendChild(this.main);
  }

  createBoard(isUser) {
    const cells = [...new Array(10)].map(() => [...new Array(10)]);
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
    this.main.classList.remove('game-over');
    this.main.classList.add('placement');

    this.status.textContent = 'Place Carrier...';
    this.currentShip = 0;

    this.rotationBtn = document.createElement('button');
    this.rotationBtn.appendChild(createSvg(mdiRefresh));
    this.rotationBtn.classList.add('rotation-btn');
    document.querySelector('.user-container').appendChild(this.rotationBtn);

    const rotateText = document.createElement('h4');
    rotateText.classList.add('status-rotate-text');
    rotateText.textContent = 'Press rotate button to change ship alignment';
    document.querySelector('.status-container').appendChild(rotateText);

    this.rotationDirection = true;
    this.rotationBtn.addEventListener('click', this.changeRotation);

    document.querySelector('.user-board').addEventListener('mouseout', this.player1Render);
    this.playerBoard.forEach((arr) => {
      arr.forEach((cell) => {
        cell.addEventListener('mouseover', this.showShip);
        cell.addEventListener('click', this.placeShipOnClick);
      });
    });
  }

  showShip = (e) => {
    this.renderBoard(this.game.player1);
    const length = ScreenController.#ships[this.currentShip][1];
    const coordinates = [+e.target.dataset.row, +e.target.dataset.col];
    const [x, y] = coordinates;

    const legal = this.game.player1.gameboard.isLegalPlacement(
      length,
      coordinates,
      this.rotationDirection,
    );

    const classer = legal ? 'ship' : 'hit';

    if (this.rotationDirection) {
      for (let i = y; i < y + length && i < 10; i += 1) {
        this.playerBoard[x][i].classList.add(classer);
      }
    } else {
      for (let i = x; i < x + length && i < 10; i += 1) {
        this.playerBoard[i][y].classList.add(classer);
      }
    }
  };

  changeRotation = () => { this.rotationDirection = !this.rotationDirection; };

  player1Render = () => this.renderBoard(this.game.player1);

  placeShipOnClick = (e) => {
    const coordinates = [+e.target.dataset.row, +e.target.dataset.col];
    if (this.game.player1.gameboard.placeShip(
      this.currentShip,
      coordinates,
      this.rotationDirection,
    )) {
      this.afterShipPlaced();
    }
  };

  afterShipPlaced() {
    this.rotationDirection = true;
    this.currentShip += 1;

    if (this.currentShip === 5) {
      // when all ships placed continue to next stage
      this.finishPlacementStage();
    } else {
      // update status text when ships remain
      const shipName = ScreenController.#ships[this.currentShip][0];
      this.status.textContent = `Place ${shipName}...`;
    }
  }

  finishPlacementStage() {
    // remove rotate button and rotate text
    this.rotationBtn.removeEventListener('click', this.changeRotation);
    this.rotationBtn.remove();
    document.querySelector('.status-rotate-text').remove();

    // remove placement event handlers
    document.querySelector('.user-board').removeEventListener('mouseout', this.player1Render);
    this.playerBoard.forEach((arr) => {
      arr.forEach((cell) => {
        cell.removeEventListener('mouseover', this.showShip);
        cell.removeEventListener('click', this.placeShipOnClick);
      });
    });

    // random place for pc board
    this.game.player2.randomPlace();

    // set turn click handlers for beginning of game
    this.setTurnHandler();
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
        boardElements[i][j].className = 'cell';
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
    this.main.classList.remove('placement');
    this.main.classList.add('active-game');
    this.status.textContent = 'Attack!';

    this.opponentBoard.forEach((arr) => {
      arr.forEach((cell) => {
        cell.addEventListener('click', this.playerMove);
      });
    });
  }

  playerMove = (e) => {
    const coordinates = [e.target.dataset.row, e.target.dataset.col];

    if (this.game.player1.makeMove(coordinates)) {
      // if successful player move then render opponent board and check for game over
      this.renderBoard(this.game.player2);
      let gameResult = this.game.isGameOver();

      if (!gameResult) {
      // if game not over make pc move, render player board and check for game over
        this.game.player2.pcMove();
        this.renderBoard(this.game.player1);
        gameResult = this.game.isGameOver();
      }

      if (gameResult) {
      // if game over process result
        this.gameOverCleanUp(gameResult);
      }
    }
  };

  gameOverCleanUp(winner) {
    this.main.className = 'main';
    this.main.classList.remove('active-game');
    this.main.classList.add('game-over');
    this.status.textContent = `Game Over, ${winner === this.game.player1 ? 'You' : 'PC'} won!`;
    this.opponentBoard.forEach((arr) => {
      arr.forEach((cell) => {
        cell.removeEventListener('click', this.playerMove);
      });
    });

    this.playAgainBtn = document.createElement('button');
    this.playAgainBtn.classList.add('play-again-btn');
    this.playAgainBtn.textContent = 'Play Again';
    document.querySelector('.status-container').appendChild(this.playAgainBtn);
    this.playAgainBtn.addEventListener('click', this.playAgain);
  }

  playAgain = () => {
    this.playAgainBtn.removeEventListener('click', this.playAgain);
    this.playAgainBtn.remove();

    this.game.reset();
    this.renderBoard(this.game.player1);
    this.renderBoard(this.game.player2);
    this.placeShips();
  };

  static #ships = [
    ['Carrier', 5],
    ['Battleship', 4],
    ['Destroyer', 3],
    ['Submarine', 3],
    ['Patrol Boat', 2],
  ];
}

export default ScreenController;
