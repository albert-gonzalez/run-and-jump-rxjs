export class Rectangle {
    constructor(canvas, width, height, color = 'black') {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.color = color;
    }

    render(x, y) {
        this.x = Math.floor(x) || this.x;
        this.y = Math.floor(y) || this.y;

        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.closePath();
        this.context.fill();
    }

    move(stepX, stepY) {
        this.x = this.x + Math.floor(stepX);
        this.y = this.y + Math.floor(stepY);
    }
}
