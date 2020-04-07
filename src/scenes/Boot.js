import { OBJECTS, SCENES, FONTS } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload() {
    const { load } = this;
    load.image(
      OBJECTS.waste.general,
      require('../assets/sprites/waste/general.png')
    );
    load.image(
      OBJECTS.waste.plastic.bottle,
      require('../assets/sprites/waste/plastic/bottle.png')
    );
    load.image(OBJECTS.BIN, require('../assets/sprites/bin.png'));
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
