import Phaser, { Physics } from 'phaser';
import { addCommonMethods } from '../helpers';
import { images } from '../../constants';

export default class Life extends Physics.Matter.Sprite {
  constructor({ scene }) {
    const { width, height } = scene.game.config;

    super(scene.matter.world, 0, height, images.heart);

    scene.add.existing(this);
    this.setBounce(0.95)
      .setVisible(false)
      .setInteractive()
      .setScale(1.2)
      .setSensor(true);

    const x = Phaser.Math.Between(this.width / 2, width - this.width);
    const y = height;
    this.setPosition(x, y);

    addCommonMethods(this);
  }
}
