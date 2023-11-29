import {
  addHover,
  getCoordsFromE,
  getValidMoves,
  movePiece,
  removeHover,
  removePreviousEffect
} from '../game/move-helpers';
import { computerTakeTurn, endGame } from '../game/play-game';
import { checkGameOver } from '../game/win-helpers';

let startCoords;
let currentPiece;
let turnOver;

const getCurrentPiece = () => currentPiece;

const setTurnOver = (turn) => (turnOver = turn);

const setStartCoords = (coords) => (startCoords = coords);

const addPieceClickListeners = () => {
  console.log('addPieceClickListeners');
  setTurnOver(false);
  const whitePieces = document.querySelectorAll('.white-piece');
  for (const piece of whitePieces) {
    piece.addEventListener('click', handlePieceClick);
  }

  waitForMove();
};

const waitForMove = () => {
  if (turnOver === false) {
    setTimeout(waitForMove, 500);
  } else {
    const gameOver = checkGameOver();
    if (gameOver) {
      endGame();
    }
    computerTakeTurn();
  }
};

const handlePieceClick = (e) => {
  console.log('handlePieceClick');
  removePreviousEffect();
  currentPiece = e.target;
  startCoords = getCoordsFromE(e);
  const isKing = currentPiece.classList.contains('king');
  const squares = getValidMoves(startCoords, true, isKing);
  continuePlayerMove(squares);
};

const continuePlayerMove = (squares) => {
  console.log('continuePlayerMove');
  addHover(squares);
  for (const square of squares) {
    square.addEventListener('click', handleSquareClick);
  }
};

const handleSquareClick = (e) => {
  console.log('handleSquareClick');
  const square = e.target;
  const piece = getCurrentPiece();
  movePiece(startCoords, square, piece, true, resetAfterMove);
};

const resetAfterMove = () => {
  console.log('resetAfterMove');
  currentPiece = undefined;
  startCoords = undefined;
  removeHover();
  removePieceListeners();
  removeSquareListeners();
  setTurnOver(true);
};

const removePieceListeners = () => {
  const whitePieces = document.querySelectorAll('.white-piece');
  for (const piece of whitePieces) {
    piece.removeEventListener('click', handlePieceClick);
  }
};

const removeSquareListeners = () => {
  const squares = document.querySelectorAll('.game-square');
  for (const square of squares) {
    square.removeEventListener('click', handleSquareClick);
  }
};

export { addPieceClickListeners, continuePlayerMove, resetAfterMove, setStartCoords };
