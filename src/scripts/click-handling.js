import { addHover, getCoordsFromE, getValidMoves, isAJump, removeHover, removeJumpedPiece } from './square-helpers';

let startCoords;
let currentPiece;

const getCurrentPiece = () => currentPiece;

const addPieceClickListeners = () => {
  const whitePieces = document.querySelectorAll('.white-piece');
  for (const piece of whitePieces) {
    piece.addEventListener('click', handlePieceClick);
  }
};

const handlePieceClick = (e) => {
  currentPiece = e.target;
  startCoords = getCoordsFromE(e);
  const isKing = currentPiece.classList.contains('king');
  const squares = getValidMoves(e, true, isKing);
  addHover(squares);
  for (const square of squares) {
    square.addEventListener('click', handleSquareClick);
  }
};

const handleSquareClick = (e) => {
  const square = e.target;
  const piece = getCurrentPiece();
  console.log('handleSquareClick e:', e);
  console.log('handleSquareClick square:', square);
  console.log('handleSquareClick piece:', piece);
  square.append(piece);
  if (isAJump(startCoords, square)) {
    removeJumpedPiece(startCoords, square);
  }
  resetAfterMove();
};

const resetAfterMove = () => {
  currentPiece = undefined;
  startCoords = undefined;
  removeHover();
  removePieceListeners();
  removeSquareListeners();
  addPieceClickListeners();
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

export { addPieceClickListeners };
