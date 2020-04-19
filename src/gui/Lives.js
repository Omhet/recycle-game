import { GameObjects } from 'phaser';
import { images } from '../constants';
import { getImageSize } from '../utils';

export default class GameOver extends GameObjects.Container {
  constructor({ scene, lives }) {
    super(scene, 0, 0);
    this.livesCount = lives;
    this.lives = [];
    this.drawLives();
    scene.add.existing(this);

    this.scene = scene;
  }

  drawLives() {
    const { width } = this.scene.game.config;
    const { width: heartWidth } = getImageSize.call(this.scene, images.heart);

    for (let i = 0; i < this.livesCount; i++) {
      const live = this.scene.add
        .image(width - heartWidth * i, 32, images.heart)
        .setOrigin(1, 0)
        .setDepth(1);
      this.lives.push(live);
    }
  }

  decreaseLives() {
    this.livesCount--;

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

  increaseLives() {
    this.livesCount++;
    this.drawLives();
  }
}
