import { addPieceListeners } from '../clicks/player-handling';
import { computerMove } from '../computer/computer-handling';
import { showWinner } from '../html-elements/build-elements';
import { checkGameOver, getWinner } from './win-helpers';

let winner;

const playGame = () => {
  playerMove();
};

const playerMove = () => {
  addPieceListeners();
};

const computerTakeTurn = () => {
  computerMove();
  const gameOver = checkGameOver();
  if (gameOver) {
    endGame();
  } else {
    playerMove();
  }
};

const askPlayAgain = (winner) => {
  showWinner(winner);
};

const endGame = () => {
  winner = getWinner();
  if (winner === undefined) {
    winner = 'No one';
  }
  askPlayAgain(winner);
};

export { computerTakeTurn, endGame, playGame };
