import { getCoordsFromPiece, getValidMoves, movePiece } from '../game/move-helpers';
import { endGame } from '../game/play-game';
import { checkGameOver } from '../game/win-helpers';

const computerMove = () => {
  const botPieces = document.querySelectorAll('.black-piece');
  const randomPiece = getRandomPiece(botPieces);
  const randomSquare = getRandomSquare(randomPiece);

  console.log('randomPiece:', randomPiece);
  console.log('randomSquare:', randomSquare);
  if (randomPiece && randomSquare) {
    const { piece } = randomPiece;
    const startCoords = getCoordsFromPiece(piece);
    setTimeout(() => {
      movePiece(startCoords, randomSquare, piece, false);
    }, 500);
  }
};

const continueComputerMove = (piece) => {
  console.log('continueComputerMove');
  const startCoords = getCoordsFromPiece(piece);
  const isKing = piece.classList.contains('king');
  const valid = getValidMoves(startCoords, false, isKing);
  const gameOver = checkGameOver();
  if (gameOver) {
    endGame();
  }
  const randomSquare = valid[Math.floor(Math.random() * valid.length)];
  movePiece(startCoords, randomSquare, piece, false);
};

const getRandomPiece = (pieces) => {
  const valid = getValidPieces(pieces);
  return valid[Math.floor(Math.random() * valid.length)];
};

const getValidPieces = (pieces) => {
  const validPieces = [];
  for (const piece of pieces) {
    console.log('piece:', piece);
    const coords = getCoordsFromPiece(piece);
    const isPlayer = piece.classList.contains('white-piece');
    const isKing = piece.classList.contains('king');
    const valid = getValidMoves(coords, isPlayer, isKing);
    console.log('coords:', coords);
    console.log('isKing:', isKing);
    console.log('valid:', valid);
    if (valid.length > 0) {
      validPieces.push({ piece: piece, moves: valid });
    }
  }
  return validPieces;
};

const getRandomSquare = (piece) => {
  if (piece && piece.moves.length > 0) {
    const { moves } = piece;
    return moves[Math.floor(Math.random() * moves.length)];
  } else {
    endGame();
  }
};

export { computerMove, continueComputerMove, getValidPieces };
