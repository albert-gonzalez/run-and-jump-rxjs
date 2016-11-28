import { loop, input, pointCounterUpdates, notifyGameOver, obstacleRespawned } from "../../src/js/reactive/observables";
import {Subject} from "rxjs/Subject";

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

        it('should return currentTime and deltaTime', () => {
            let ticker =
                loop.subscribe((t) => {
                    ticker = t;
                });

            jasmine.clock().tick(20);

            expect(ticker.time).toBeDefined();
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

            let keyEvent = new KeyboardEvent('keydown', {key: char});

            document.dispatchEvent(keyEvent);

            expect(keyPressed).toBe(char);

            keyEvent = new KeyboardEvent('keyup');

            document.dispatchEvent(keyEvent);

            expect(keyPressed).toBeFalsy();
        });
    });

    describe('pointCounterUpdates', () => {
        beforeEach(() => {
            jasmine.clock().install();
        });

        afterEach(() => {
            jasmine.clock().uninstall();
        });

        it('should tick every 1000 ms', () => {
            let counter = 0;

            pointCounterUpdates.subscribe(() => {
                counter++;
            });

            jasmine.clock().tick(2000);

            expect(counter).toBe(2);
        });
    });

    describe('notifyGameOver', () => {
        it('should be a Subjet', () => {
            expect(notifyGameOver instanceof Subject).toBeTruthy();
        });
    });

    describe('obstacleRespawned', () => {
        it('should be a Subjet', () => {
            expect(obstacleRespawned instanceof Subject).toBeTruthy();
        });
    });
});
