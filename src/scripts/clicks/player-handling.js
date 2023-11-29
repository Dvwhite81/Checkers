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
import { hideSkip } from '../html-elements/build-elements';
import { addDragListeners, handlePieceDrag, prepForReset, removeDragListeners } from './drag-handling';

let startCoords;
let currentPiece;
let turnOver;

const setStartCoords = (coords) => (startCoords = coords);
const setCurrentPiece = (piece) => (currentPiece = piece);
const getCurrentPiece = () => currentPiece;
const setTurnOver = (turn) => (turnOver = turn);

const addPieceListeners = () => {
  console.log('addPieceListeners');
  setTurnOver(false);
  const whitePieces = document.querySelectorAll('.white-piece');
  for (const piece of whitePieces) {
    piece.draggable = true;
    piece.addEventListener('dragstart', handlePieceDrag);
    piece.addEventListener('click', startPlayerMove);
  }

  waitForMove();
};

const addSquareListeners = (square) => {
  console.log('addSquareListeners square:', square);
  square.addEventListener('click', pieceMove);
  addDragListeners(square);
};

const removePieceListeners = () => {
  const whitePieces = document.querySelectorAll('.white-piece');
  for (const piece of whitePieces) {
    piece.removeEventListener('dragstart', handlePieceDrag);
    piece.removeEventListener('click', startPlayerMove);
  }
};

const removeSquareListeners = () => {
  const squares = document.querySelectorAll('.game-square');
  for (const square of squares) {
    square.removeEventListener('click', pieceMove);
    square.removeEventListener('dragover', prepForReset);

    removeDragListeners(square);
  }
};

const startPlayerMove = (e) => {
  removePieceListeners();
  removePreviousEffect();
  removePointer();
  currentPiece = e.target;
  startCoords = getCoordsFromE(e);
  const isKing = currentPiece.classList.contains('king');
  const squares = getValidMoves(startCoords, true, isKing);
  continuePlayerMove(squares);
};

const continuePlayerMove = (squares) => {
  console.log('continuePlayerMove');
  addHover(squares);
  addPointer(squares);
  for (const square of squares) {
    addSquareListeners(square);
  }
};

const pieceMove = (e) => {
  console.log('pieceMove e:', e);
  const square = e.target;
  const piece = getCurrentPiece();
  movePiece(startCoords, square, piece, true, resetAfterMove);
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

const resetAfterMove = (turn) => {
  console.log('resetAfterMove');
  currentPiece = undefined;
  startCoords = undefined;
  removeHover();
  removePointer();
  removePieceListeners();
  removeSquareListeners();
  hideSkip();
  setTurnOver(turn);
};

const addPointer = (pieces) => {
  for (const piece of pieces) {
    piece.classList.add('pointer');
  }
};

const removePointer = () => {
  const pointerPieces = document.querySelectorAll('.pointer');
  for (const piece of pointerPieces) {
    piece.classList.remove('pointer');
  }
};

export {
  addPieceListeners,
  continuePlayerMove,
  getCurrentPiece,
  pieceMove,
  removePieceListeners,
  removePointer,
  removeSquareListeners,
  resetAfterMove,
  setCurrentPiece,
  setStartCoords,
  startPlayerMove
};
