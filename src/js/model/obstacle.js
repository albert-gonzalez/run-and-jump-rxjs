import {Rectangle} from "./rectangle";

export class Obstacle extends Rectangle{
    constructor(canvas) {
        super(canvas, 20, 50);
    }

    isOutOfCanvas() {
        return this.x + this.width < 0 || this.x > this.canvas.width;
    }
}
