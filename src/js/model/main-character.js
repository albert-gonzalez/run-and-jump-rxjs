import {Circle} from "./circle";
import {Rectangle} from "./rectangle";

const maxJumpHeight = 120;

export class MainCharacter extends Rectangle{
    constructor(canvas) {
        super(canvas, 40, 40);
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.currentJumpHeight = 0.0;
            this.currentDirection = 'up';
        }
    }

    moveToNextPosition(deltaTime) {
        if (this.jumping) {
            let movement;
            if (this.currentJumpHeight >= maxJumpHeight) {
                this.currentDirection = 'down';
            }

            if (this.currentDirection == 'up') {
                movement = -200 * deltaTime;
            } else {
                movement = +200 * deltaTime;
            }

            movement = Math.floor(movement);
            this.move(0, movement);
            this.currentJumpHeight -= movement;

            if (this.currentJumpHeight <= 0) {
                this.jumping = false;
                this.y = this.canvas.height - this.height - 20;
            }

        }
    }
}
