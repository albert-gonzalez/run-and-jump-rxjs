export class Sprite {
    constructor(canvas, width, height, sourceOptions) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.src = sourceOptions.image;
        this.sourceOptions = sourceOptions;
        this.width = width;
        this.height = height;
        this.setAction(sourceOptions.defaultAction);
    }

    render(x, y) {
        this.x = Math.floor(x) || this.x;
        this.y = Math.floor(y) || this.y;

        this.context.drawImage(
            this.image,
            this.currentFrame * this.sourceOptions.width,
            this.action.y,
            this.sourceOptions.width,
            this.sourceOptions.height,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.currentCycle++;

        if (this.action.auto && this.currentCycle >= this.sourceOptions.frameSpeed) {
            this.currentCycle = 0;
            this.currentFrame = (this.currentFrame + 1) % this.action.length
        }
    }

    move(stepX, stepY) {
        this.x = this.x + Math.floor(stepX);
        this.y = this.y + Math.floor(stepY);
    }

    setAction(action) {
        this.action = this.sourceOptions.actions[action];
        this.currentCycle = 0;
        this.currentFrame = 0;
    }
}
