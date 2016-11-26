import {loop} from "../../src/js/reactive/observables";

describe('loop', () => {
    it('tics every 20 ms', () => {
        let counter = 0;
        jasmine.clock().install();

        loop.subscribe(() => {
            counter++;
        });
        jasmine.clock().tick(40);

        expect(counter).toBe(2);
    });
});
