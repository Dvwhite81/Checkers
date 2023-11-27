import './styles/global.scss';

import createBoard from './scripts/build-elements';
import playGame from './scripts/play-game';

const setUp = () => {
  createBoard();
  playGame();
};

setUp();
