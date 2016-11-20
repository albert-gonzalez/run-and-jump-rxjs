import { Text } from './text';

export class PointCounter extends Text {
    constructor(canvas) {
        super(canvas, 20);
        this.canvas = canvas;
        this.x = canvas.width - 250;
        this.y = 40;
        this.context = this.canvas.getContext('2d');
        this.points = 0;
    }

    increasePoints() {
        this.points += 100;
    }

    render() {
        super.render(`Score: ${this.points.toString()}`);
    }
}