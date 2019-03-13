import { Text } from './text';

export class GameOverText extends Text {
  constructor (canvas, scale) {
    super(canvas, 11 * scale);
    this.x = 25 * scale;
    this.y = canvas.height / 2;
    this.visible = false;
  }

  render () {
    if (this.visible) {
      super.render('Game Over! Press Enter to Retry');
    }
  }

  show () {
    this.visible = true;
  }

  hide () {
    this.visible = false;
  }
}
