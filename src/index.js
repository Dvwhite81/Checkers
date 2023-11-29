import './styles/global.scss';

import { playGame } from './scripts/game/play-game';
import createBoard from './scripts/html-elements/build-elements';

const setUp = () => {
  createBoard();
  playGame();
};

setUp();
