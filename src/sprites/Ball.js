import { Physics } from 'phaser';
import { OBJECTS } from '../constants';

export default class Ball extends Physics.Matter.Sprite {
  constructor({ scene, x, y }) {
    super(scene.matter.world, x, y, OBJECTS.BALL);
    scene.add.existing(this);
    const size = 110;
    this
      .setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVelocityY(-20);
  }
}
