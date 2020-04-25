import { GameObjects } from 'phaser';
import { images } from '../constants';
import { getImageSize } from '../utils';

export default class GameOver extends GameObjects.Container {
  constructor({ scene, lives }) {
    super(scene, 0, 0);
    this.lives = [];
    for (let i = 0; i < lives; i++) {
      this.addLife(i);
    }
    scene.add.existing(this);

    this.scene = scene;
  }

  addLife(i) {
    const { width } = this.scene.game.config;
    const { width: heartWidth } = getImageSize.call(this.scene, images.heart);
    const life = this.scene.add
      .image(width - heartWidth * i, 32, images.heart)
      .setOrigin(1, 0)
      .setDepth(1);
    this.lives.push(life);

    return life;
  }

  increaseLives() {
    const life = this.addLife(this.lives.length);
    this.scene.tweens.add({
      targets: [life],
      duration: 250,
      ease: 'Quad.easeOut',
      scale: '+=0.5',
      yoyo: true,
    });
  }

  decreaseLives() {
    const life = this.lives.pop();

    if (this.lives.length > 1) {
      this.scene.tweens.add({
        targets: [life],
        duration: 250,
        ease: 'Quad.easeOut',
        scale: '+=0.5',
        yoyo: true,
        onComplete: () => life.destroy(),
      });
    } else {
      life.destroy();
    }
  }
}
