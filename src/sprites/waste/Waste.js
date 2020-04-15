import Phaser, { Physics } from 'phaser';

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
  }

  dispose() {
    this.destroy();
    delete this;
  }

  getRandomVelocity() {
    const { width } = this.scene.game.config;
    let velX = Phaser.Math.Between(0, 8);
    velX = this.x < width / 2 ? velX : -velX;
    const velY = Phaser.Math.Between(-25, -30);

    return { velX, velY };
  }

  getRandomAngleVelocity() {
    const dir = Phaser.Math.Between(0, 1) === 1 ? -1 : 1;
    const vel = Phaser.Math.RND.realInRange(0.01, 0.06);

    return vel * dir;
  }

  throw() {
    const { velX, velY } = this.getRandomVelocity();
    const angleVel = this.getRandomAngleVelocity();
    this.setVisible(true)
      .setAngularVelocity(angleVel)
      .setVelocity(velX, velY);
  }
}
