import { Observable, Scheduler } from "rxjs/bundles/Rx";
import { Subject } from "rxjs/Subject";

const TICKER_INTERVAL = 20;

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
        event => event
    ),
    Observable.fromEvent(document, 'click',
        event => event
    ),
    Observable.fromEvent(document, 'keyup', event => false)
).distinctUntilChanged();

const pointCounterUpdates = Observable.interval(1000).timeInterval();

const notifyGameOver = new Subject();

const obstacleRespawned = new Subject();

export { loop, input, pointCounterUpdates, notifyGameOver, obstacleRespawned };