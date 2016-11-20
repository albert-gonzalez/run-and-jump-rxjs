import { Observable, Scheduler } from "rxjs/bundles/Rx";

const TICKER_INTERVAL = 17;

const loop = Observable
    .interval(TICKER_INTERVAL, Scheduler.requestAnimationFrame)
    .map(() => ({
        time: Date.now(),
        deltaTime: null
    }))
    .scan(
        (previous, current) => ({
            time: current.time,
            deltaTime: (current.time - previous.time) / 1000
        })
    );

const input = Observable.merge(
    Observable.fromEvent(document, 'keydown',
        event => event.keyCode
    ),
    Observable.fromEvent(document, 'keyup', event => false),
    Observable.create((subscriber) => {subscriber.next(false); subscriber.complete(); })
);

const pointCounterUpdates = Observable.interval(1000).timeInterval();

const notifyGameOver = Observable.range(0,1).delay(10);

export { loop, input, pointCounterUpdates, notifyGameOver };