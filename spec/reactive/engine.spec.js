import { gameLoop, initGame, gameOver, gameReset, gameInput, mainCharacterJump } from "../../src/js/reactive/engine";


describe('observers', () => {
    let canvas;
    const LOOP_TICKS = 20;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'game');
        document.body.appendChild(canvas);
        initGame();
        jasmine.clock().install();
    });

    afterEach(() => {
        document.body.removeChild(canvas);
        jasmine.clock().uninstall();
    });

    describe('gameLoop', () => {
        it('should only send notifications when is not game over', () => {
            let counter = 0;
            gameLoop.subscribe(() => {
                counter++;
            });

            jasmine.clock().tick(LOOP_TICKS);
            gameOver();
            jasmine.clock().tick(LOOP_TICKS);

            expect(counter).toBe(1);
        });
    });

    describe('gameInput', () => {
        it('should send input and ticker notifications at the same time', () => {
            let pressedKey = false;
            let char = 'a';
            let anotherChar = 'b';

            gameInput.subscribe(([ticker, event]) => {
                pressedKey = event.key;
            });

            let keyDownEvent = new KeyboardEvent('keydown', {key: char});
            let keyUpEvent = new KeyboardEvent('keyup');
            document.dispatchEvent(keyDownEvent);

            expect(pressedKey).toBeFalsy();

            jasmine.clock().tick(LOOP_TICKS);

            expect(pressedKey).toBe(char);
            document.dispatchEvent(keyUpEvent);

            keyDownEvent = new KeyboardEvent('keydown', {key: anotherChar});
            document.dispatchEvent(keyDownEvent);

            expect(pressedKey).toBe(char);
            document.dispatchEvent(keyUpEvent);


        });
    });

    describe('gameReset', () => {
        it('should only send notifications when is game over and user press enter', () => {
            let counter = 0;
            gameReset.subscribe(() => {
                counter++;
            });

            let keyDownEvent = new KeyboardEvent('keydown', {code: 'Enter'});
            let keyUpEvent = new KeyboardEvent('keyup');

            document.dispatchEvent(keyDownEvent);
            document.dispatchEvent(keyUpEvent);

            gameOver();

            document.dispatchEvent(keyDownEvent);
            document.dispatchEvent(keyUpEvent);

            expect(counter).toBe(1);
        });

        it('should only send notifications when is game over and user click on canvas', () => {
            let counter = 0;
            gameReset.subscribe(() => {
                counter++;
            });

            let clickEvent = new MouseEvent('click', {
                bubbles: true,
            });
            canvas.dispatchEvent(clickEvent);

            gameOver();

            clickEvent = new MouseEvent('click', {
                bubbles: true,
            });
            canvas.dispatchEvent(clickEvent);

            expect(counter).toBe(1);
        });
    });

    describe('mainCharacterJump', () => {
        it('should only send notifications when user press space bar and gameLoop sends a notification', () => {
            let counter = 0;
            mainCharacterJump.subscribe(() => {
                counter++;
            });

            let keyDownEvent = new KeyboardEvent('keydown', {code: 'Space'});
            let keyUpEvent = new KeyboardEvent('keyup');

            document.dispatchEvent(keyDownEvent);
            document.dispatchEvent(keyUpEvent);

            expect(counter).toBe(0);

            jasmine.clock().tick(LOOP_TICKS);

            expect(counter).toBe(1);
        });

        it('should only send notifications when user click on canvas and gameLoop sends a notification', () => {
            let counter = 0;
            mainCharacterJump.subscribe(() => {
                counter++;
            });

            let clickEvent = new MouseEvent('click', {
                bubbles: true,
            });
            canvas.dispatchEvent(clickEvent);

            expect(counter).toBe(0);

            jasmine.clock().tick(LOOP_TICKS);

            expect(counter).toBe(1);
        });
    });
});