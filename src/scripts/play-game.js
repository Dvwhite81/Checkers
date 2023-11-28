import { addPieceClickListeners } from './click-handling';

const playGame = () => {
  console.log('playGame');
  const { player, computer, playerTurn, gameOver } = initGame();
  addPieceClickListeners();
};

const initGame = () => {
  console.log('initGame');
  let player;
  let computer;
  let playerTurn = true;
  let gameOver = false;
  return { player, computer, playerTurn, gameOver };
};

export default playGame;
