import { Physics } from 'phaser';

export default class Bin extends Physics.Matter.Sprite {
  constructor({ scene, x, key, type }) {
    const { height } = scene.game.config;
    const size = 400;

    super(scene.matter.world, x, height - size * 0.75);

    this.binImage = scene.add.image(x, height - size / 2, key);
    this.binImage.setDisplaySize(size, size);

    this.setDisplaySize(size * 0.68, 10)
      .setSensor(true)
      .setStatic(true);

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
