import { GameObjects } from 'phaser';
import { images } from '../constants';

export default class Score extends GameObjects.Text {
  constructor({ scene, text }) {
    const offset = 16;
    const icon = scene.add.image(offset, offset, images.icon).setDepth(1);
    icon.setPosition(offset + icon.width / 2, offset + icon.height / 2);
    super(
      scene,
      icon.width + offset * 2,
      icon.height / 2 - offset * 1.5,
      text,
      {
        fontSize: 80,
        fontStyle: 'bold',
        shadow: {
          offsetX: 3,
          offsetY: 1,
          color: '#6ea2d0',
          fill: true,
        },
      }
    )
      .setOrigin(0, 0)
      .setDepth(1);

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

  dispose() {
    this.destroy();
    this.icon.destroy();
  }

  setScore = score => {
    this.iconTween.restart();
    this.setText(score);
  };
}
