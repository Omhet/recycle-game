import { Physics } from 'phaser';
import { animations } from '../../constants';
import { getAnimationName } from '../../utils';

export default class Bin extends Physics.Matter.Sprite {
  constructor({ scene, x, key, type }) {
    const { height } = scene.game.config;
    const size = 400;

    super(scene.matter.world, x, height - size);

    this.binImage = scene.add.sprite(x, height, key);
    const anim = getAnimationName(key, animations.bin.idle);
    try {
      this.binImage.anims.play(anim);
    } catch {
      console.error(`Can't play animation ${anim}`);
    }
    this.binImage.setDisplaySize(size * 0.92, size).setOrigin(0.5, 1);

    this.setDisplaySize(size * 0.95, 10)
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
