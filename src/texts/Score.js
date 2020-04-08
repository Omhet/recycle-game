import { GameObjects } from 'phaser';

const scoreTemplate = score => `Score: ${score}`;

export default class Score extends GameObjects.Text {
  constructor({ scene, text }) {
    super(scene, 32, 32, scoreTemplate(text), { fontSize: '48px' });

    scene.add.existing(this);
  }

  setScore = score => {
    this.text = scoreTemplate(score);
  };
}
