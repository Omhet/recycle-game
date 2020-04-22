import {
  objects,
  scenes,
  fonts,
  images,
  animations,
  sounds,
} from '../constants';
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
      objects.waste.paper.ball,
      require('../assets/sprites/waste/paper/ball.png')
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
    // Back
    load.image(
      objects.back.gradient,
      require('../assets/sprites/background/gradient.png')
    );
    load.image(
      objects.back.floor,
      require('../assets/sprites/background/floor.png')
    );
    load.image(
      objects.back.pavement,
      require('../assets/sprites/background/pavement.png')
    );
    load.image(
      objects.back.grass,
      require('../assets/sprites/background/grass.png')
    );
    load.image(
      objects.back.shrub,
      require('../assets/sprites/background/shrub.png')
    );
    load.image(
      objects.back.city,
      require('../assets/sprites/background/city.png')
    );
    load.image(
      objects.back.cityBack,
      require('../assets/sprites/background/city-back.png')
    );
    for (let i = 0; i < 3; i++) {
      load.image(
        objects.back.clouds[`cloud${i}`],
        require(`../assets/sprites/background/cloud-${i}.png`)
      );
    }
    // Font
    load.bitmapFont(
      fonts.main,
      require('../assets/fonts/font.png'),
      require('../assets/fonts/font.fnt')
    );
    // Misc
    load.image(images.logo, require('../assets/sprites/logo.png'));
    load.image(images.play, require('../assets/sprites/play.png'));
    load.image(images.icon, require('../assets/sprites/icon.png'));
    load.image(images.heart, require('../assets/sprites/heart.png'));
    // Sounds
    load.audio(sounds.main, require('../assets/sounds/main.mp3'));
    load.audio(sounds.puke, require('../assets/sounds/puke.wav'));
    load.audio(sounds.joy, require('../assets/sounds/joy.wav'));
    load.audio(sounds.pop, require('../assets/sounds/pop.wav'));
    load.audio(sounds.whoosh, require('../assets/sounds/whoosh.wav'));
    load.audio(sounds.stop, require('../assets/sounds/stop.wav'));
    load.audio(sounds.ding, require('../assets/sounds/ding.wav'));
  }

  create() {
    this.scene.start(scenes.main);
  }
}
