import { Observable, Scheduler } from "rxjs";

const TICKER_INTERVAL = 20;

const loop = Observable
    .interval(TICKER_INTERVAL)
    .timeInterval()
    .map((timeInterval) => ({
        deltaTime: timeInterval.interval / 1000
    }));

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
    if (event.type === 'mousedown' || event.type === 'touchstart') {
        return { target: { id: event.target.id } };
    }

    return event;
}

export { loop, input};