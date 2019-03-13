import { createGameLoop } from '../../src/js/reactive/engine';

describe('engine observables', () => {
  let canvas;
  const LOOP_TICKS = 20;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game');
    document.body.appendChild(canvas);
    jasmine.clock().install();
  });

  afterEach(() => {
    document.body.removeChild(canvas);
    jasmine.clock().uninstall();
  });

  describe('gameLoop', () => {
    it('should only send notifications when is not game over', () => {
      let counter = 0;
      createGameLoop({ isGameRunning: false }).subscribe(() => {
        counter++;
      });

      jasmine.clock().tick(LOOP_TICKS);

      expect(counter).toBe(0);
    });
  });
});
