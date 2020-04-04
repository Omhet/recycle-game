import { SCENES, OBJECTS } from '../constants';
import { Scene } from 'phaser';

export default class Main extends Scene {
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {
    this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

    const ball = this.matter.add.sprite(
      this.game.config.width / 2,
      100,
      OBJECTS.BALL
    );
    ball.setDisplaySize(100, 100);
    ball.setSize(100, 100);
    ball.setBounce(0.95);
  }

  update(time, delta) {}
}
