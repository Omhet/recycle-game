import { GameObjects } from 'phaser';
import { fonts, images } from '../constants';

const scoreTemplate = score => `${score}`;

export default class Score extends GameObjects.BitmapText {
  constructor({ scene, text }) {
    const offset = 16;
    const icon = scene.add
      .image(offset, offset, images.icon)
      .setOrigin(0, 0)
      .setDepth(1);
    super(
      scene,
      icon.width + offset * 2,
      icon.height / 2 - offset,
      fonts.main,
      scoreTemplate(text),
      56
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
