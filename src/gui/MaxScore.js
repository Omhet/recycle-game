import { GameObjects } from 'phaser';
import Text from './Text';

export default class MaxScore extends GameObjects.Group {
  constructor({ scene, maxScore }) {
    const { width, height } = scene.game.config;
    const text = new Text({
      scene,
      text: `Max Score: ${maxScore}`,
      x: width / 2,
      y: height - height / 4,
      fontSize: 72,
    });
    super(scene, [text]);
    text.setOrigin(0.5, 0.5);
    scene.add.existing(this);
  }
}
