import Phaser from 'phaser';

const commonMethods = {
  dispose() {
    this.destroy();
    delete this;
  },
  getRandomVelocity() {
    const { width } = this.scene.game.config;
    let velX = Phaser.Math.Between(0, 8);
    velX = this.x < width / 2 ? velX : -velX;
    const velY = Phaser.Math.Between(-25, -30);

    return { velX, velY };
  },
  getRandomAngleVelocity() {
    const dir = Phaser.Math.Between(0, 1) === 1 ? -1 : 1;
    const vel = Phaser.Math.RND.realInRange(0.01, 0.06);

    return vel * dir;
  },
  throw() {
    const { velX, velY } = this.getRandomVelocity();
    this.setVisible(true).setVelocity(velX, velY);
  },
  throwWithRandomAngle() {
    const { velX, velY } = this.getRandomVelocity();
    const angleVel = this.getRandomAngleVelocity();
    this.setVisible(true)
      .setAngularVelocity(angleVel)
      .setVelocity(velX, velY);
  },
};

export default function addCommonMethods(obj) {
  for (const methodName of Object.keys(commonMethods)) {
    obj[methodName] = commonMethods[methodName];
  }
}
