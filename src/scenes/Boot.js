import { OBJECTS, SCENES } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload() {
    const { load } = this;
    load.image(OBJECTS.BALL, require('../assets/sprites/ball.png'));
  }

  create() {
    this.scene.start(SCENES.MAIN);
  }
}
