import { GameObjects } from 'phaser';
import { fonts } from '../constants';

const scoreTemplate = score => `SCORE: ${score}`;

export default class Score extends GameObjects.BitmapText {
  constructor({ scene, text }) {
    const { width } = scene.game.config;
    super(scene, width / 2, 32, fonts.main, scoreTemplate(text), 42);

    scene.add.existing(this).setOrigin(0.5, 0);
  }

  setScore = score => {
    this.setText(scoreTemplate(score));
  };
}
