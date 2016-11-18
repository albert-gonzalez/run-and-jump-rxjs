export class PointCounter {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = canvas.width - 100;
        this.y = 20;
        this.context = this.canvas.getContext('2d');
        this.points = 0;
    }

    increasePoints() {
        this.points += 100;
    }

    render() {
        this.context.beginPath();
        this.context.fillText(this.points, this.x, this.y);
    }
}