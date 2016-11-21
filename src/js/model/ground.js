import { Sprite } from "./sprite";

const sourceConfig = {
    width: 24,
    height: 40,
    image: require('../../../assets/sprites/ground.png'),
    frameSpeed: 10,
    actions: {
        ground: { length: 1, y: 0, auto: false },
    },
    defaultAction: 'ground'
};

export class Ground extends Sprite {
    constructor(canvas, scale) {
        super(canvas, 24 * scale , 40 * scale, sourceConfig);
        this.x = 0;
        this.y = canvas.height - this.height;
        this.translate = 0;
        this.scale = scale;
    }

    render(x, y) {
        this.context.save();
        this.context.translate(this.translate, 0);
        this.translate = (this.translate - (2 * this.scale)) % (48 * this.scale);

        for(let i = 0; i < 20; i++) {
            super.render(1 + this.width * i, this.y);
        }

        this.context.restore();
    }
}
