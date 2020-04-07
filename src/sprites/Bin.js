import Phaser, { Physics } from 'phaser';
import { objects, wasteType } from '../constants';

export default class Bin extends Physics.Matter.Sprite {
  constructor({ scene }) {
    const { width, height } = scene.game.config;
    const size = 400;

    super(scene.matter.world, width / 2, height - size * 0.75);

    const bin = scene.add.image(width / 2, height - size / 2, objects.bin);
    bin.setDisplaySize(size, size);

    this.setDisplaySize(size * 0.75, 10)
      .setSensor(true)
      .setStatic(true);

    this.type = Phaser.Math.RND.pick(Object.values(wasteType));
  }

  checkType(type) {
    return this.type === type;
  }
}
