import { GameObjects } from 'phaser';
import { images } from '../constants';
import { getImageSize } from '../utils';

export default class GameOver extends GameObjects.Container {
  constructor({ scene, lives }) {
    const { width } = scene.game.config;
    const { width: heartWidth } = getImageSize.call(scene, images.heart);
    super(scene, 0, 0);
    this.lives = [];
    for (let i = 0; i < lives; i++) {
      const live = scene.add
        .image(width - heartWidth * i, 32, images.heart)
        .setOrigin(1, 0)
        .setDepth(1);
      this.lives.push(live);
    }
    scene.add.existing(this);

    this.scene = scene;
  }

  decreaseLives() {
    const live = this.lives.pop();

    if (this.lives.length > 1) {
      this.scene.tweens.add({
        targets: [live],
        duration: 250,
        ease: 'Quad.easeOut',
        scale: '+=0.5',
        yoyo: true,
        onComplete: () => live.destroy(),
      });
    } else {
      live.destroy();
    }
  }
}
