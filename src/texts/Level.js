import { GameObjects } from 'phaser';
import { fonts } from '../constants';

const levelTemplate = score => `LEVEL: ${score}`;

export default class Score extends GameObjects.BitmapText {
  constructor({ scene, text }) {
    const { width } = scene.game.config;
    super(scene, width - 32, 32, fonts.main, levelTemplate(text), 42);
    this.setOrigin(1, 0);

    scene.add.existing(this);
  }

  setLevel = score => {
    this.setText(levelTemplate(score));
  };
}
