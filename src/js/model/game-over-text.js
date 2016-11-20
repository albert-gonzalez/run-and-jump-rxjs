import { Text } from './text';

export class GameOverText extends Text {
    constructor(canvas) {
        super(canvas, 11);
        this.x = 25;
        this.y = canvas.height / 2;
        this.visible = false;
    }

    render() {
        if (this.visible) {
            super.render('Game Over! Press Enter to Retry');
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}
