export class PointCounter {
    constructor(canvas) {
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
        this.context.beginPath();
        this.context.fillStyle = 'white';
        this.context.shadowOffsetX = 1;
        this.context.shadowOffsetY = 1;
        this.context.shadowColor = 'black';
        this.context.font = '20px "Press Start 2P"';
        this.context.fillText(`Score: ${this.points.toString()}`, this.x, this.y);
        this.context.closePath();
    }
}