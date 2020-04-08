import Phaser, { Physics } from 'phaser';
import { gameOptions } from '../../constants';

export default class Waste extends Physics.Matter.Sprite {
  constructor({ scene, key, type }) {
    const { width, height } = scene.game.config;
    const { wasteSize: size } = gameOptions;
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

  getRandomVelocity() {
    const { width } = this.scene.game.config;
    let velX = Phaser.Math.Between(0, 8);
    velX = this.x < width / 2 ? velX : -velX;
    const velY = Phaser.Math.Between(-20, -30);

    return { velX, velY };
  }

  throw() {
    const { velX, velY } = this.getRandomVelocity();
    this.setVisible(true).setVelocity(velX, velY);
  }
}
