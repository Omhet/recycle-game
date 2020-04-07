import Phaser, { Physics } from 'phaser';
import { gameOptions } from '../../index';

export default class Waste extends Physics.Matter.Sprite {
  constructor({ scene, key, type }) {
    const { width, height } = scene.game.config;
    const { ballSize: size } = gameOptions;
    const x = Phaser.Math.Between(size / 2, width - size);
    const y = height - size;
    super(scene.matter.world, x, y, key);

    scene.add.existing(this);
    this.setSize(size, size)
      .setDisplaySize(size, size)
      .setBounce(0.95)
      .setVisible(false);

    this.type = type;
  }

  dispose() {
    this.destroy();
    delete this;
  }

  throw() {
    this.setVisible(true).setVelocityY(-30);
  }
}