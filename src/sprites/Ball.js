import { Physics, Math } from 'phaser';
import { OBJECTS } from '../constants';

export default class Ball extends Physics.Matter.Sprite {
  constructor({ scene }) {
    const { width, height } = scene.game.config;
    const size = 110;
    const x = Math.Between(size, width - size);
    const y = height - size;
    super(scene.matter.world, x, y, OBJECTS.BALL);
    scene.add.existing(this);
    this.setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVisible(false);
  }

  throw() {
    this.setVisible(true).setVelocityY(-30);
  }
}
