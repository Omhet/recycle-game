import { GameObjects } from 'phaser';
import { fonts } from '../constants';

const scoreTemplate = score => `SCORE: ${score}`;

export default class Score extends GameObjects.BitmapText {
  constructor({ scene, text }) {
    super(scene, 32, 32, fonts.main, scoreTemplate(text), 42);

    scene.add.existing(this);
  }

  setScore = score => {
    this.setText(scoreTemplate(score));
  };
}
