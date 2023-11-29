import WhitePiece from '../../assets/images/piece1.png';
import BlackPiece from '../../assets/images/piece2.png';
import { resetAfterMove } from '../clicks/player-handling';
import { playGame } from '../game/play-game';
import { buildElement, coordsIn, isEven, pieceCoords, whiteCoords } from './build-helpers';

const container = document.querySelector('#container');

const domSetup = () => {
  clearDom();
  createBoard();
  createHelpButton();
  createModal();
  createSkip();
};

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
  const img = color === 'white' ? WhitePiece : BlackPiece;
  return buildElement({ className: `piece ${color}-piece` }, {}, { backgroundImage: `url(${img})` });
};

const createHelpButton = () => {
  const helpBtn = document.createElement('button');
  helpBtn.id = 'open-modal-btn';
  helpBtn.textContent = 'Help';
  helpBtn.addEventListener('click', () => openModal(helpMessage));
  container.append(helpBtn);
};

const createModal = () => {
  const modal = buildElement({ id: 'myModal' });
  const closeSpan = document.createElement('span');
  closeSpan.id = 'close-modal';
  closeSpan.innerHTML = '&times';
  closeSpan.addEventListener('click', closeModal);
  modal.append(closeSpan);
  const content = buildElement({ id: 'modal-content' });
  modal.append(content);
  container.append(modal);
};

const openModal = (message) => {
  const modal = document.querySelector('#myModal');
  modal.style.display = 'flex';
  const content = document.querySelector('#modal-content');
  content.innerHTML = message;
};

const closeModal = () => {
  const modal = document.querySelector('#myModal');
  modal.style.display = 'none';
};

export const changeMessage = (message) => {
  openModal(message);
};

const helpMessage = `
  <h3>Click or drag a light piece to move it!</h3>
  <p>Gold squares show valid moves.</p>
  <p>Blue and white squares show the computer's last move.</p>
`;

const playAgainMessage = (winner) => `
    <h2>${winner} won the game!</h2>
    <h3>Play again?</h3>
    <button id="play-again-btn">
      Sure!
    </button>
`;

const createSkip = () => {
  const skipButton = document.createElement('button');
  skipButton.id = 'skip-btn';
  skipButton.textContent = "Don't jump";
  skipButton.style.display = 'none';
  container.append(skipButton);
};

export const showSkip = () => {
  const skipButton = document.querySelector('#skip-btn');
  skipButton.addEventListener('click', skipMove);
  skipButton.style.display = 'block';
};

export const hideSkip = () => {
  const skipButton = document.querySelector('#skip-btn');
  skipButton.style.display = 'none';
};

const skipMove = () => {
  resetAfterMove(true);
  hideSkip();
};

const clearDom = () => {
  container.innerHTML = '';
};

export const showWinner = (winner) => {
  changeMessage(playAgainMessage(winner));
  const btn = document.querySelector('#play-again-btn');
  btn.addEventListener('click', clearAndPlayAgain);
};

const clearAndPlayAgain = () => {
  console.log('clearAndPlayAgain');
  clearDom();
  domSetup();
  playGame();
};

export default domSetup;
