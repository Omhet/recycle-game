import { GameObjects } from 'phaser';
import Text from './Text';
import { images } from '../constants';

export default class Score extends GameObjects.Group {
  constructor({ scene, maxScore }) {
    const { width } = scene.game.config;
    const offset = 16;
    const icon = scene.add.image(offset, offset, images.icon).setDepth(1);
    const max = new Text({
      scene,
      text: `Max`,
      x: 0,
      y: icon.height / 2 - offset * 1.5,
      fontSize: 80,
    }).setDepth(1);
    const score = new Text({
      scene,
      text: `is ${maxScore}`,
      x: 0,
      y: icon.height / 2 - offset * 1.5,
      fontSize: 80,
    });
    super(scene, [max, score, icon]);
    score.setOrigin(0, 0).setDepth(1);

    const sumW = max.width + icon.width + score.width + offset * 2;
    const padding = Math.floor((width - sumW) / 2);
    max.x = padding;
    icon.setPosition(
      max.x + max.width + icon.width / 2 + offset,
      offset + icon.height / 2
    );
    score.x = icon.x + icon.width / 2 + offset;

    scene.add.existing(this);

    this.icon = icon;

    this.iconTween = scene.tweens.add({
      targets: [this.icon],
      duration: 400,
      ease: 'Quad.easeOut',
      props: {
        angle: {
          value: '+=360',
        },
        scale: {
          value: '+=0.2',
          yoyo: true,
        },
      },
    });
  }
}
