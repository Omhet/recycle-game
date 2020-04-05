import { Physics } from 'phaser';
import { OBJECTS } from '../constants';

export default class Ball extends Physics.Matter.Sprite {
  constructor({ scene, x }) {
    super(scene.matter.world, x, scene.game.config.height, OBJECTS.BALL);
    scene.add.existing(this);
    const size = 110;
    this
      .setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVelocityY(-20);
  }
}
