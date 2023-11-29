import './styles/global.scss';

import { playGame } from './scripts/game/play-game';
import domSetup from './scripts/html-elements/build-elements';

const setUp = () => {
  domSetup();
  playGame();
};

setUp();

export default setUp;
