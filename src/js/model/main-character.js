import { Sprite } from "./sprite";

const maxJumpHeight = 85;
const sourceConfig = {
    width: 74,
    height: 96,
    image: require('../../../assets/sprites/bonk.png'),
    frameSpeed: 10,
    actions: {
        jump: { length: 3, y: 203, auto: false },
        run: { length: 4, y: 103, auto: true },
        death: { length: 1, y: 0, auto: false, width: 92}
    },
    defaultAction: 'run'
};

export class MainCharacter extends Sprite {
    constructor(canvas, scale) {
        super(
            canvas,
            74 * scale,
            96 * scale,
            sourceConfig
        );
        this.scale = scale;
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.setAction('jump');
            this.currentJumpHeight = 0.0;
            this.currentDirection = 'up';
            this.initY = this.y;
        }
    }

    moveToNextPosition(deltaTime) {
        if (this.jumping) {
            let movement;
            if (this.currentJumpHeight >= maxJumpHeight * this.scale) {
                this.currentDirection = 'down';
                this.currentFrame = 2;
            }

            if (this.currentDirection == 'up') {
                movement = -200 * deltaTime;

                if (this.currentJumpHeight >= 20 && this.currentFrame != 1) {
                    this.currentFrame = 1;
                }
            } else {
                movement = +200 * deltaTime;
            }

            movement = Math.floor(movement) * this.scale;
            this.move(0, movement);
            this.currentJumpHeight -= movement;

            if (this.currentJumpHeight <= 0) {
                this.jumping = false;
                this.setAction('run');
                this.y = this.initY;
            }

        }
    }
}
