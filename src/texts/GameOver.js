import { GameObjects } from 'phaser';
import { fonts } from '../constants';

export default class GameOver extends GameObjects.BitmapText {
  constructor({ scene }) {
    const { width } = scene.game.config;
    const text = `WASTED\nTAP OR CLICK TO CONTINUE`;
    super(scene, width / 2, 0, fonts.main, text, 52);
    this.setOrigin(0.5, 0).setCenterAlign();
    scene.add.existing(this);
  }
}
