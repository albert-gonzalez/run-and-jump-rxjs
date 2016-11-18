import {Rectangle} from "./rectangle";

export class Ground extends Rectangle{
    constructor(canvas) {
        super(canvas, canvas.width, 20);
        this.x = 0;
        this.y = canvas.height - this.height;
    }
}
