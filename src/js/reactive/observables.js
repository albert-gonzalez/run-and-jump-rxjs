import { Observable, Scheduler } from "rxjs/bundles/Rx";

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
    Observable.fromEvent(document, 'keydown', returnEvent),
    Observable.fromEvent(document, 'mousedown', returnEvent),
    Observable.fromEvent(document, 'touchstart', returnEvent),
    Observable.fromEvent(document, 'keyup', event => false),
    Observable.fromEvent(document, 'mouseup', event => false),
    Observable.fromEvent(document, 'touchend', event => false),
)
    .startWith(false)
    .distinctUntilChanged();

function returnEvent(event) {
    return event;
}

export { loop, input};