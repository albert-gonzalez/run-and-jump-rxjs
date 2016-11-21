import { Text } from './text';

export class PointCounter extends Text {
    constructor(canvas, scale) {
        super(canvas, 20 * scale);
        this.canvas = canvas;
        this.x = canvas.width - (250 * scale);
        this.y = 40 * scale;
        this.context = this.canvas.getContext('2d');
        this.points = 0;
        this.scale = scale;
    }

    increasePoints() {
        this.points += 100;
    }

    render() {
        super.render(`Score: ${this.points.toString()}`);
    }
}