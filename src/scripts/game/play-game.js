import { computerMove } from '../computer/computer-handling';
import { showWinner } from '../html-elements/build-elements';
import { addPieceClickListeners } from '../player/click-handling';
import { checkGameOver, getWinner } from './win-helpers';

let winner;

const playGame = () => {
  console.log('playGame');
  // Maybe get name?
  playerTakeTurn();
};

const playerMove = () => {
  addPieceClickListeners();
  // addDragListeners
};

// Maybe have to check gameOver after each turn?
const playerTakeTurn = () => {
  console.log('playerTakeTurn');
  playerMove();
};

const computerTakeTurn = () => {
  console.log('computerTakeTurn');
  computerMove();
  const gameOver = checkGameOver();
  if (gameOver) {
    endGame();
  } else {
    playerTakeTurn();
  }
};

const askPlayAgain = (winner) => {
  showWinner(winner);
};

const endGame = () => {
  console.log('endGame');
  winner = getWinner();
  if (winner === undefined) {
    winner = 'No one';
  }
  askPlayAgain(winner);
};

export { computerTakeTurn, endGame, playerTakeTurn, playGame };
