import { startWith, distinctUntilChanged, timeInterval, map } from 'rxjs/operators';
import { fromEvent, interval, merge } from 'rxjs';

const TICKER_INTERVAL = 20;

const loop = interval(TICKER_INTERVAL).pipe(
  timeInterval(),
  map((timeInterval) => ({
    deltaTime: timeInterval.interval / 1000
  }))
);

const input = merge(
  fromEvent(document, 'keydown', returnEvent),
  fromEvent(document, 'mousedown', returnEvent),
  fromEvent(document, 'touchstart', returnEvent),
  fromEvent(document, 'keyup', event => false),
  fromEvent(document, 'mouseup', event => false),
  fromEvent(document, 'touchend', event => false)
).pipe(
  startWith(false),
  distinctUntilChanged()
);

function returnEvent (event) {
  if (event.type === 'mousedown' || event.type === 'touchstart') {
    return { target: { id: event.target.id } };
  }

  return event;
}

export { loop, input };
