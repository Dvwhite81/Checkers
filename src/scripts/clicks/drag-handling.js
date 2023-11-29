import { getInvalidSquares } from '../game/move-helpers';
import {
  addPieceListeners,
  pieceMove,
  removeSquareListeners,
  resetAfterMove,
  startPlayerMove
} from './player-handling';

const handlePieceDrag = (e) => {
  console.log('drag start e:', e);
  startPlayerMove(e);
  const invalidSquares = getInvalidSquares();
  console.log('handlePieceDrag invalidSquares:', invalidSquares);
  for (const square of invalidSquares) {
    square.addEventListener('dragover', prepForReset);
  }
};

const prepForReset = (e) => {
  e.preventDefault();
  const square = e.target;
  console.log('prepForReset square:', square);
  square.addEventListener('drop', resetTurn);
};

const resetTurn = () => {
  resetAfterMove(false);
  addPieceListeners();
};

const handleDragEnter = (e) => {
  console.log('drag enter e:', e);
  e.preventDefault();
  e.target.addEventListener('dragleave', handleDragLeave);
  e.target.addEventListener('drop', handleDrop);
};

const handleDragLeave = (e) => {
  console.log('drag leave e:', e);
  e.target.removeEventListener('drop', handleDrop);
  e.target.addEventListener('dragenter', handleDragEnter);
};

const handleDragOver = (e) => {
  e.preventDefault();
  return false;
};

const handleDrop = (e) => {
  console.log('drop e:', e);
  e.preventDefault();
  removeSquareListeners();
  pieceMove(e);
};

const addDragListeners = (square) => {
  console.log('addDragListeners square:', square);
  square.addEventListener('dragenter', handleDragEnter);
  square.addEventListener('dragover', handleDragOver);
};

const removeDragListeners = (square) => {
  square.removeEventListener('dragenter', handleDragEnter);
  square.removeEventListener('dragleave', handleDragLeave);
  square.removeEventListener('drop', handleDrop);
};

export {
  addDragListeners,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handlePieceDrag,
  prepForReset,
  removeDragListeners
};
