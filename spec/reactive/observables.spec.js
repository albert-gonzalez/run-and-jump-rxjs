import { loop, input } from '../../src/js/reactive/observables';

describe('observable', () => {
  describe('loop', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should tick every 20 ms', () => {
      let counter = 0;

      loop.subscribe(() => {
        counter++;
      });

      jasmine.clock().tick(40);

      expect(counter).toBe(2);
    });

    it('should return deltaTime', () => {
      let ticker =
                loop.subscribe((t) => {
                  ticker = t;
                });

      jasmine.clock().tick(20);

      expect(ticker.deltaTime).toBeDefined();
    });
  });

  describe('input', () => {
    it('should detect any key from the keyboard on keydown and keyup', () => {
      let keyPressed = false;
      let char = 'a';

      input.subscribe((event) => {
        keyPressed = event ? event.key : false;
      });

      let keyEvent = new KeyboardEvent('keydown', { key: char });

      document.dispatchEvent(keyEvent);

      expect(keyPressed).toBe(char);

      keyEvent = new KeyboardEvent('keyup');

      document.dispatchEvent(keyEvent);

      expect(keyPressed).toBeFalsy();
    });
  });
});
