import { Physics } from 'phaser';
import { OBJECTS } from '../constants';
import { gameOptions } from '../index';

export default class Ball extends Physics.Matter.Sprite {
  constructor({ scene, cell }) {
    const { height } = scene.game.config;
    const { ballSize: size } = gameOptions;
    const x = cell * size;
    const y = height - size;
    super(scene.matter.world, x, y, OBJECTS.BALL);
    scene.add.existing(this);
    this.setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVisible(false);

    this.size = size;
    this.initX = x;
    this.initY = y;
  }

  die() {
    this.destroy();
    delete this;
  }

  throw() {
    this.setVisible(true).setVelocityY(-30);
  }
}
