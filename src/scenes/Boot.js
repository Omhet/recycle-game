import { objects, scenes, fonts } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: scenes.boot });
  }

  preload() {
    const { load } = this;
    load.image(
      objects.waste.general,
      require('../assets/sprites/waste/general.png')
    );
    load.image(
      objects.waste.plastic.bottle,
      require('../assets/sprites/waste/plastic/bottle.png')
    );
    load.image(objects.bin, require('../assets/sprites/bin.png'));
    load.bitmapFont(
      fonts.main,
      require('../assets/fonts/font.png'),
      require('../assets/fonts/font.fnt')
    );
  }

  create() {
    this.scene.start(scenes.main);
  }
}
