export class Rectangle {
    constructor(canvas, width, height, color = 'black', patternImg = null) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.color = color;

        if (patternImg) {
            let image = new Image();
            image.src = patternImg;
            image.onload = () => {
                this.color = this.context.createPattern(image, 'repeat');
            };
        }

        this.translate = 1;
    }

    render(x, y) {
        this.x = Math.floor(x) || this.x;
        this.y = Math.floor(y) || this.y;

        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    move(stepX, stepY) {
        this.x = this.x + Math.floor(stepX);
        this.y = this.y + Math.floor(stepY);
    }
}
