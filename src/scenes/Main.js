import { SCENES, OBJECTS, FONTS } from '../constants';
import { Scene } from 'phaser';

export default class Main extends Scene {
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {
    this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

    const size = 110;
    this.ball = this.matter.add.sprite(
      this.game.config.width / 2,
      this.game.config.height,
      OBJECTS.BALL
    );
    this.ball
      .setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVelocityY(-20);

    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);

    this.debugText = this.add.bitmapText(50, 50, FONTS.MAIN, "DEBUG");
  }

  handleSwipe({ x, y, left, right, up, down }) {
    const vel = 20;
    if (isIntersecting(this.ball, { x, y })) {
      let velX = left ? -vel : right ? vel : 0;
      let velY = up ? -vel : down ? vel : 0;
      this.ball.setVelocity(velX, velY);
    }
  }

}

function isIntersecting(obj, { x, y }) {
  const { left, right, top, bottom } = obj.getBounds();
  return x >= left && x <= right && y >= top && y <= bottom;
}
