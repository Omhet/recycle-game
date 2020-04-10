import { Physics } from 'phaser';

export default class Bin extends Physics.Matter.Sprite {
  constructor({ scene, x, key, type }) {
    const { height } = scene.game.config;

    super(scene.matter.world, x, height);

    this.binImage = scene.add.image(x, height, key);
    this.binImage.setScale(0.8).setOrigin(0.5, 1);

    this.setDisplaySize(this.binImage.width * 0.8, 10)
      .setSensor(true)
      .setStatic(true);
    this.y = height - this.binImage.height * 0.8;

    this.type = type;
    this.fill = 0;
  }

  checkIfTypeMatch(type) {
    return this.type === type;
  }

  checkIfFull(limit) {
    return this.fill === limit;
  }

  increaseFill() {
    this.fill++;
  }
}
