const getValidMoves = (e, isPlayer, isKing) => {
  const coords = getCoordsFromE(e);
  return getAdjSquares(coords, isPlayer, isKing);
};

const getCoordsFromE = (e) => {
  const square = e.target.parentElement;
  const x = square.getAttribute('x');
  const y = square.getAttribute('y');
  return [Number(x), Number(y)];
};

const getSquareFromCoords = (coords) => {
  return document.querySelector(`[coords="${[coords]}"]`);
};

const getCoordsFromSquare = (square) => {
  return [Number(square.getAttribute('x')), Number(square.getAttribute('y'))];
};

const getAdjSquares = (coords, isPlayer, isKing) => {
  return isPlayer ? getPlayerAdjSquares(coords, isPlayer, isKing) : getComputerAdjSquares(coords, isPlayer, isKing);
};

const getAdjCoords = (coords, isKing) => {
  const [x, y] = coords;
  const adjCoords = [];
  const leftCoords = [x - 1, y - 1];
  const rightCoords = [x - 1, y + 1];
  adjCoords.push(leftCoords, rightCoords);

  if (isKing) {
    const downLeftCoords = [x + 1, y - 1];
    const downRightCoords = [x + 1, y + 1];
    adjCoords.push(downLeftCoords, downRightCoords);
  }

  return adjCoords;
};

const getPlayerAdjSquares = (coords, isPlayer, isKing) => {
  console.log('getPlayerAdjSquares coords:', coords);
  const squares = [];
  const adjCoords = getAdjCoords(coords, isKing);
  console.log(' getPlayerAdjSquares adjCoords:', adjCoords);
  for (const coord of adjCoords) {
    const square = getSquareFromCoords(coord);
    console.log(' getPlayerAdjSquares square:', square);
    if (coordsOnBoard(coord)) {
      console.log(' getPlayerAdjSquares coordsOnBoard true');

      if (isEmpty(square)) {
        console.log(' getPlayerAdjSquares isEmpty true');
        squares.push(square);
      } else if (canBeJumped(coords, square, isPlayer)) {
        const squareCoords = getCoordsFromSquare(square);
        const nextSquare = getJumpableSquare(coords, squareCoords, isPlayer);
        squares.push(nextSquare);
      }
    }
  }
  console.log(' getPlayerAdjSquares end squares:', squares);
  return squares;
};

const getComputerAdjSquares = () => {};

const canBeJumped = (coords, square, isPlayer) => {
  const squareCoords = getCoordsFromSquare(square);
  if (!squareHasOpponentPiece(square, isPlayer)) {
    return false;
  }
  const nextSquare = getJumpableSquare(coords, squareCoords, isPlayer);
  return isEmpty(nextSquare);
};

const squareHasOpponentPiece = (square, isPlayer) => {
  const opponent = isPlayer ? 'black-piece' : 'white-piece';
  return square.children[0].classList.contains(opponent);
};

const getJumpableSquare = (startCoords, squareCoords, isPlayer) => {
  const [x, y] = startCoords;
  const [squareX, squareY] = squareCoords;
  const [xDiff, yDiff] = [x - squareX, y - squareY];
  let nextCoords;
  if (isPlayer) {
    nextCoords = [squareX - xDiff, squareY - yDiff];
  }
  return document.querySelector(`[coords="${nextCoords}"]`);
};

const isAJump = (coords, square) => {
  const squareCoords = getCoordsFromSquare(square);
  const [xDiff, yDiff] = [coords[0] - squareCoords[0], coords[1] - squareCoords[1]];
  return xDiff > 1 || yDiff > 1;
};

const removeJumpedPiece = (startCoords, square) => {
  const [startX, startY] = startCoords;
  const squareY = getCoordsFromSquare(square)[1];

  let jumpedCoords;
  jumpedCoords = startY > squareY ? [startX - 1, startY - 1] : [startX - 1, startY + 1];
  const jumpedSquare = document.querySelector(`[coords="${jumpedCoords}"]`);
  const piece = jumpedSquare.children[0];
  piece.remove();
};

const coordsOnBoard = (coords) => coords.every((num) => inValidRange(num));

const inValidRange = (num) => num >= 0 && num <= 7;

const isEmpty = (square) => square.children.length === 0;

const addHover = (squares) => {
  removeHover();
  for (const square of squares) square.classList.add('valid');
};

const removeHover = () => {
  const squares = document.querySelectorAll('.valid');
  console.log('removeHover squares:', squares);
  for (const square of squares) square.classList.remove('valid');
};

export { addHover, getCoordsFromE, getValidMoves, isAJump, removeHover, removeJumpedPiece };
