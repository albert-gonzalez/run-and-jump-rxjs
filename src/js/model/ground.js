import {Rectangle} from "./rectangle";

export class Ground extends Rectangle {
    constructor(canvas) {
        super(canvas, canvas.width*2, 40, 'black', require('../../../assets/sprites/ground.png'));
        this.x = 0;
        this.y = canvas.height - this.height;
        this.translate = 0;
    }

    render(x, y) {
        this.context.save();
        this.context.translate(this.translate, 0);
        this.translate = (this.translate - 2) % 48;
        super.render(x, y);

        this.context.restore();
    }
}
