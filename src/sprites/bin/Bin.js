import { Physics } from 'phaser';
import { animations } from '../../constants';
import { getAnimationName } from '../../utils';

export default class Bin extends Physics.Matter.Sprite {
  constructor({ scene, x, key, type }) {
    const { height } = scene.game.config;
    const size = 400;

    super(scene.matter.world, x, height - size);

    this.setDisplaySize(size, 10)
      .setSensor(true)
      .setStatic(true);

    this.animJoy = getAnimationName(key, animations.bin.joy);
    this.animIdle = getAnimationName(key, animations.bin.idle);
    this.animPuke = getAnimationName(key, animations.bin.puke);
    this.animDead = getAnimationName(key, animations.bin.dead);

    this.binImage = scene.add.sprite(x, height, key);
    this.binImage.anims.play(this.animIdle);
    this.binImage.setOrigin(0.5, 1);
    this.binImage.on('animationcomplete', this.handleAnimationComplete, this);

    this.type = type;
    this.fill = 0;
  }

  handleAnimationComplete(anim) {
    if (anim.key === this.animJoy || anim.key === this.animPuke) {
      this.binImage.anims.play(this.animIdle);
    }
  }

  die() {
    this.destroy();
    this.binImage.anims.play(this.animDead);
  }

  checkIfTypeMatch(type) {
    return this.type === type;
  }

  checkIfFull(limit) {
    return this.fill === limit;
  }

  hitWrong() {
    this.binImage.anims.play(this.animPuke);
  }

  hitRight() {
    this.binImage.anims.play(this.animJoy);
    this.increaseFill();
  }

  increaseFill() {
    this.fill++;
  }
}
