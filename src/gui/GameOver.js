import { GameObjects } from 'phaser';
import Text from './Text';

export default class GameOver extends GameObjects.Group {
  constructor({ scene }) {
    const { width, height } = scene.game.config;
    const text = new Text({
      scene,
      text: `WASTED\n\nTAP OR CLICK TO RESTART`,
      x: width / 2,
      y: height / 3,
      fontSize: 72,
    });
    super(scene, [text]);
    text.setOrigin(0.5, 0.5);
    scene.add.existing(this);
  }
}
