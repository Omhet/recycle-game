import { objects, scenes, fonts, images } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: scenes.boot });
  }

  preload() {
    const { load } = this;
    // Waste
    load.image(
      objects.waste.general,
      require('../assets/sprites/waste/general.png')
    );
    load.image(
      objects.waste.plastic.bottle,
      require('../assets/sprites/waste/plastic/bottle.png')
    );
    load.image(
      objects.waste.glass.bottle,
      require('../assets/sprites/waste/glass/bottle.png')
    );
    load.image(
      objects.waste.metal.can,
      require('../assets/sprites/waste/metal/can.png')
    );
    load.image(
      objects.waste.paper.scrap,
      require('../assets/sprites/waste/paper/scrap.png')
    );
    // Bin
    load.image(
      objects.bin.plastic,
      require('../assets/sprites/bin/plastic.png')
    );
    load.image(objects.bin.glass, require('../assets/sprites/bin/glass.png'));
    load.image(objects.bin.metal, require('../assets/sprites/bin/metal.png'));
    load.image(objects.bin.paper, require('../assets/sprites/bin/paper.png'));
    // Font
    load.bitmapFont(
      fonts.main,
      require('../assets/fonts/font.png'),
      require('../assets/fonts/font.fnt')
    );
    // Misc
    load.image(images.logo, require('../assets/sprites/logo.png'));
  }

  create() {
    this.scene.start(scenes.main);
  }
}
