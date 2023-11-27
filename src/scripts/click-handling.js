import { getValidMoves } from './square-helpers';

const addPieceClickListeners = (setCurrentPiece) => {
  console.log('addPieceClickListeners');
  const whitePieces = document.querySelectorAll('.white-piece');
  console.log('whitePieces:', whitePieces);
  whitePieces.forEach(piece => {
    piece.addEventListener('click', () => pieceClickHandler(piece, setCurrentPiece));
  });
};

const pieceClickHandler = (piece, setCurrentPiece) => {
  setCurrentPiece(piece);
  getValidMoves(piece);
};

const addSquareClickListeners = (squares, setCurrentTarget) => {
  squares.forEach(square => {
    square.addEventListener('click', () => squareClickHandler(square, setCurrentTarget));
  });
};

const squareClickHandler = (square, setCurrentTarget) => {
  setCurrentTarget(square);
};

export { addPieceClickListeners, addSquareClickListeners };
