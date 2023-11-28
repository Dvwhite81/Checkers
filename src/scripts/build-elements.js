import WhitePiece from '../assets/images/piece1.png';
import BlackPiece from '../assets/images/piece2.png';
import { buildElement, coordsIn, isEven, pieceCoords, whiteCoords } from './build-helpers';

const container = document.querySelector('#container');

const createBoard = () => {
  const board = buildElement({ id: 'gameboard' });
  const squares = createSquares();
  for (const square of squares) board.append(square);
  container.append(board);
};

const createSquares = () => {
  const squares = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const className = isEven(x, y) ? ' light' : ' dark game-square';
      const square = createSquare(x, y, className);
      squares.push(square);
    }
  }
  return squares;
};

const createSquare = (x, y, className) => {
  const coords = [x, y];
  const square = buildElement({ className: `square${className}` }, { coords: coords, x: x, y: y });

  let piece;

  if (coordsIn(coords, pieceCoords)) {
    piece = createPiece(coords);
    square.append(piece);
  }
  return square;
};

const createPiece = (coords) => {
  const color = coordsIn(coords, whiteCoords) ? 'white' : 'black';
  const id = `${color}-piece-${coords}`;
  const img = color === 'white' ? WhitePiece : BlackPiece;
  return buildElement({ id: id, className: `piece ${color}-piece` }, {}, { backgroundImage: `url(${img})` });
};

export default createBoard;
