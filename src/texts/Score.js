import { GameObjects } from 'phaser';
import { images } from '../constants';

const scoreTemplate = score => `${score}`;

export default class Score extends GameObjects.Text {
  constructor({ scene, text }) {
    const offset = 16;
    const icon = scene.add
      .image(offset, offset, images.icon)
      .setOrigin(0, 0)
      .setDepth(1);
    super(
      scene,
      icon.width + offset * 2,
      icon.height / 2 - offset * 1.5,
      scoreTemplate(text),
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
  }

  dispose() {
    this.destroy();
    this.icon.destroy();
  }

  setScore = score => {
    this.setText(scoreTemplate(score));
  };
}
