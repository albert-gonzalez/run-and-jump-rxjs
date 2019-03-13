import { createGameLoop, render, SPACE_KEY, SPACE_KEY_CODE } from './reactive/engine';

require('../css/main.scss');

function preventSpacebarDefault () {
  document.addEventListener('keydown', (e) => {
    if (e.code === SPACE_KEY || e.key === SPACE_KEY || e.keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
    }
  });
}

preventSpacebarDefault();

createGameLoop().subscribe(render);
