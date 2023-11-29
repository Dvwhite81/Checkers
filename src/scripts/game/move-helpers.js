import WhiteKing from '../../assets/images/piece1-king.png';
import BlackKing from '../../assets/images/piece2-king.png';
import { continuePlayerMove, setStartCoords } from '../clicks/click-handling';
import { continueComputerMove } from '../computer/computer-handling';
import { endGame } from './play-game';

const movePiece = (startCoords, square, piece, isPlayer, resetAfterMove) => {
  console.log('movePiece');
  square.append(piece);

  if (!isPlayer) {
    addPreviousEffect(startCoords, square);
  }

  if (checkForKing(square, piece)) {
    makePieceKing(piece);
  }

  const jumped = isAJump(startCoords, square);
  console.log('movePiece jumped:', jumped);
  if (jumped) {
    console.log('calling handleJump from movePiece if jumped');
    handleJump(startCoords, square, piece, isPlayer, resetAfterMove);
  } else if (isPlayer && !jumped) {
    resetAfterMove();
  }
};

const getJumpMoves = (newCoords, isPlayer, isKing) => {
  console.log('getJumpMoves');
  const jumpMoves = [];
  const valid = getValidMoves(newCoords, isPlayer, isKing);
  console.log('getJumpMoves valid:', valid);
  if (valid.length > 0) {
    for (const square of valid) {
      if (isAJump(newCoords, square)) {
        jumpMoves.push(square);
      }
    }
  }
  return jumpMoves;
};

const handleJump = (startCoords, square, piece, isPlayer, resetAfterMove) => {
  console.log('handleJump');
  console.log('calling removeJumpedPiece from handleJump');
  removeJumpedPiece(startCoords, square);
  const newCoords = getCoordsFromPiece(piece);
  const isKing = piece.classList.contains('king');
  const possibleMoves = getJumpMoves(newCoords, isPlayer, isKing);
  console.log('handleJump possibleMoves:', possibleMoves);
  const canJumpAgain = possibleMoves.length > 0;
  if (isPlayer) {
    if (canJumpAgain) {
      console.log('handleJump if canJumpAgain');
      setStartCoords(newCoords);
      continuePlayerMove(possibleMoves);
    } else {
      resetAfterMove();
    }
  } else {
    if (canJumpAgain) {
      continueComputerMove(piece);
    }
  }
};

const getCoordsFromE = (e) => {
  const square = e.target.parentElement;
  const x = square.getAttribute('x');
  const y = square.getAttribute('y');
  return [Number(x), Number(y)];
};

const getCoordsFromPiece = (piece) => {
  const parent = piece.parentElement;
  return [Number(parent.getAttribute('x')), Number(parent.getAttribute('y'))];
};

const getSquareFromCoords = (coords) => {
  return document.querySelector(`[coords="${[coords]}"]`);
};

const getCoordsFromSquare = (square) => {
  return [Number(square.getAttribute('x')), Number(square.getAttribute('y'))];
};

const getValidMoves = (coords, isPlayer, isKing) => {
  console.log('getValidMoves');
  const squares = [];
  const adjCoords = getAdjCoords(coords, isPlayer, isKing);

  if (adjCoords.length === 0) {
    endGame();
  }

  for (const coord of adjCoords) {
    const square = getSquareFromCoords(coord);

    if (coordsOnBoard(coord)) {
      if (isEmpty(square)) {
        squares.push(square);
      } else {
        const nextSquare = getJumpableSquare(coords, square, isPlayer);
        if (nextSquare) {
          squares.push(nextSquare);
        }
      }
    }
  }

  return squares;
};

const getAdjCoords = (coords, isPlayer, isKing) => {
  const [x, y] = coords;
  const adjCoords = [];
  const leftCoords = isPlayer ? [x - 1, y - 1] : [x + 1, y - 1];
  const rightCoords = isPlayer ? [x - 1, y + 1] : [x + 1, y + 1];
  adjCoords.push(leftCoords, rightCoords);

  if (isKing) {
    const kingLeftCoords = isPlayer ? [x + 1, y - 1] : [x - 1, y - 1];
    const kingRightCoords = isPlayer ? [x + 1, y + 1] : [x - 1, y + 1];
    adjCoords.push(kingLeftCoords, kingRightCoords);
  }

  return adjCoords;
};

const squareHasOpponentPiece = (square, isPlayer) => {
  const opponent = isPlayer ? 'black-piece' : 'white-piece';
  let hasOpponent = false;
  if (square.children.length > 0 && square.children[0].classList.contains(opponent)) {
    hasOpponent = true;
  }
  return hasOpponent;
};

const getJumpableSquare = (coords, square, isPlayer) => {
  const [x, y] = coords;
  if (squareHasOpponentPiece(square, isPlayer)) {
    const squareCoords = getCoordsFromSquare(square);
    const [squareX, squareY] = squareCoords;
    const [xDiff, yDiff] = [x - squareX, y - squareY];
    const nextCoords = [squareX - xDiff, squareY - yDiff];
    const nextSquare = document.querySelector(`[coords="${nextCoords}"]`);
    if (nextSquare && isEmpty(nextSquare)) {
      return nextSquare;
    }
  }
  return false;
};

const isAJump = (coords, square) => {
  console.log('isAJump');
  console.log('isAJump coords:', coords);
  console.log('isAJump square:', square);

  const squareCoords = getCoordsFromSquare(square);
  console.log('isAJump squareCoords:', squareCoords);

  const [xDiff, yDiff] = [coords[0] - squareCoords[0], coords[1] - squareCoords[1]];
  console.log('isAJump [xDiff, yDiff]:', [xDiff, yDiff]);

  const validDiffs = new Set([2, -2]);
  console.log('isAJump validDiffs:', validDiffs);

  return [xDiff, yDiff].every((num) => validDiffs.has(num));
};

const removeJumpedPiece = (startCoords, square) => {
  console.log('removeJumpedPiece startCoords:', startCoords);
  const [startX, startY] = startCoords;
  const [squareX, squareY] = getCoordsFromSquare(square);

  const jumpedCoords = [Math.max(startX, squareX) - 1, Math.max(startY, squareY) - 1];
  console.log('removeJumpedPiece jumpedCoords:', jumpedCoords);

  const jumpedSquare = document.querySelector(`[coords="${jumpedCoords}"]`);
  console.log('removeJumpedPiece jumpedSquare:', jumpedSquare);

  const piece = jumpedSquare.children[0];
  console.log('removeJumpedPiece piece:', piece);
  piece.remove();
};

const coordsOnBoard = (coords) => coords.every((num) => inValidRange(num));

const inValidRange = (num) => num >= 0 && num <= 7;

const isEmpty = (square) => square.children.length === 0;

const addHover = (squares) => {
  console.log('addHover');
  removeHover();
  for (const square of squares) {
    square.classList.add('valid');
  }
};

const removeHover = () => {
  const squares = document.querySelectorAll('.valid');
  for (const square of squares) square.classList.remove('valid');
};

const addPreviousEffect = (prevCoords, currentSquare) => {
  const prevSquare = getSquareFromCoords(prevCoords);
  prevSquare.classList.add('previous');
  currentSquare.classList.add('current');
};

const removePreviousEffect = () => {
  console.log('removePrevious');
  const previous = document.querySelectorAll('.previous');
  if (previous) {
    console.log('previous:', previous);
    for (const square of previous) square.classList.remove('previous');
  }
  const current = document.querySelectorAll('.current');
  if (current) {
    for (const square of current) square.classList.remove('current');
  }
};

const checkForKing = (square, piece) => {
  const color = piece.classList[1].split('-')[0];
  const row = getCoordsFromSquare(square)[0];
  const kingRow = color === 'white' ? 0 : 7;
  return row === kingRow;
};

const makePieceKing = (piece) => {
  const color = piece.classList[1].split('-')[0];
  const img = color === 'white' ? WhiteKing : BlackKing;
  piece.style.backgroundImage = `url(${img})`;
  piece.classList.add('king');
};

export {
  addHover,
  coordsOnBoard,
  getCoordsFromE,
  getCoordsFromPiece,
  getCoordsFromSquare,
  getJumpableSquare,
  getSquareFromCoords,
  getValidMoves,
  isAJump,
  isEmpty,
  movePiece,
  removeHover,
  removeJumpedPiece,
  removePreviousEffect
};
