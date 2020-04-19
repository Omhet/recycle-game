import Phaser, { Physics } from 'phaser';
import { addCommonMethods } from '../helpers';

export default class Waste extends Physics.Matter.Sprite {
  constructor({ scene, key, type }) {
    const { width, height } = scene.game.config;

    super(scene.matter.world, 0, height, key);

    scene.add.existing(this);
    this.setBounce(0.95).setVisible(false);

    const x = Phaser.Math.Between(this.width / 2, width - this.width);
    const y = height;
    this.setPosition(x, y);
    this.type = type;

    addCommonMethods(this);
  }
}
