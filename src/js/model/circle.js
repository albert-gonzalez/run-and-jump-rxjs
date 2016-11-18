export class Circle {
    constructor(canvas, radius, color = 'black') {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.radius = radius;
        this.height = radius * 2;
        this.width = this.height;
        this.color = color;
    }

    render(x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.context.beginPath();
        this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        this.context.fillStyle = this.color;
        this.context.closePath();
        this.context.fill();
    }

    move(stepX, stepY) {
        this.x += stepX;
        this.y += stepY;
    }
}
