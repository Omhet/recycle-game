import { GameObjects } from 'phaser';
import Text from './Text';
import { images } from '../constants';

export default class Score extends GameObjects.Group {
  constructor({ scene, score }) {
    const offset = 16;
    const icon = scene.add.image(offset, offset, images.icon).setDepth(1);
    icon.setPosition(offset + icon.width / 2, offset + icon.height / 2);
    const text = new Text({
      scene,
      text: score,
      x: icon.width + offset * 2,
      y: icon.height / 2 - offset * 1.5,
      fontSize: 80,
    });
    super(scene, [text, icon]);
    text.setOrigin(0, 0).setDepth(1);

    scene.add.existing(this);

    this.icon = icon;
    this.text = text;

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

  setScore = score => {
    this.iconTween.restart();
    this.text.setText(score);
  };
}
