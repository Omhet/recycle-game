import { GameObjects } from 'phaser';
import { fonts } from '../constants';

export default class GameOver extends GameObjects.BitmapText {
  constructor({ scene }) {
    const { width, height } = scene.game.config;
    const text = `WASTED\n\nTAP OR CLICK TO RESTART`;
    super(scene, width / 2, height / 3, fonts.main, text, 50);
    this.setOrigin(0.5, 0.5).setCenterAlign();
    scene.add.existing(this);
  }
}
