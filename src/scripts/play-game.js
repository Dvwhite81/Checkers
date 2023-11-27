import { addPieceClickListeners } from './click-handling';

const playGame = () => {
  console.log('playGame');
  const { player, computer, currentPiece, setCurrentPiece, currentTarget, setCurrentTarget, playerTurn, gameOver } = initGame();
  addPieceClickListeners(setCurrentPiece);
}


const initGame = () => {
  console.log('initGame');
  let player;
  let computer;
  let currentPiece;
  let currentTarget;
  let playerTurn = true;
  let gameOver = false;
  const setCurrentPiece = (piece) => currentPiece = piece;
  const setCurrentTarget = (square) => currentTarget = square;
  return { player, computer, currentPiece, setCurrentPiece, currentTarget, setCurrentTarget, playerTurn, gameOver };
};

export default playGame;
