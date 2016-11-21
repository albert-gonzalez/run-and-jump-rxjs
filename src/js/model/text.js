export class Text {
    constructor(canvas, size) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.size = size;
    }

    render(text) {
        this.context.save();
        this.context.beginPath();
        this.context.fillStyle = 'white';
        this.context.shadowOffsetX = 1;
        this.context.shadowOffsetY = 1;
        this.context.shadowColor = 'black';
        this.context.font = `${this.size}px "Press Start 2P"`;
        this.context.fillText(text, this.x, this.y);
        this.context.closePath();
        this.context.restore();
    }
}
