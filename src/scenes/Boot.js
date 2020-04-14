import { objects, scenes, fonts, images, animations } from '../constants';
import { getAnimationName } from '../utils';
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
    // Bins
    for (const bin of Object.values(objects.bin)) {
      for (const anim of Object.values(animations.bin)) {
        load.spritesheet(
          getAnimationName(bin, anim),
          require(`../assets/sprites/bin/${bin}/${anim}.png`),
          {
            frameWidth: 450,
            frameHeight: 450,
          }
        );
      }
    }
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
