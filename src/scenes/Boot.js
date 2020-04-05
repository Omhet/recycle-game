import { OBJECTS, SCENES, FONTS } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload() {
    const { load } = this;
    load.image(OBJECTS.BALL, require('../assets/sprites/ball.png'));
    load.bitmapFont(
      FONTS.MAIN,
      require('../assets/fonts/font.png'),
      require('../assets/fonts/font.fnt')
    );
  }

  create() {
    this.scene.start(SCENES.MAIN);
  }
}
