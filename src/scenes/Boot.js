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
import { Text } from '../gui';

export default class Boot extends Scene {
  constructor() {
    super({ key: scenes.boot });
  }

  preload() {
    const { width, height } = this.game.config;
    const div = width < 900 ? 1.3 : 2;
    const fontSize = width < 900 ? 52 : 56;
    const boxWidth = width / div;
    const boxHeight = 80;
    const boxX = width / 2 - boxWidth / 2;
    const boxY = height / 2;
    const barOffset = 20;
    const loading = new Text({
      scene: this,
      x: boxX,
      y: boxY - barOffset,
      text: 'Loading...',
      fontSize,
    }).setOrigin(0, 1);
    const percent = new Text({
      scene: this,
      x: boxX + boxWidth,
      y: boxY - barOffset,
      text: '0%',
      fontSize,
    }).setOrigin(1, 1);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xd4ecf7, 0.5);
    progressBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 16);
    this.load.on('progress', value => {
      progressBar.clear();
      progressBar.fillStyle(0xf3f3ff);
      progressBar.fillRoundedRect(
        boxX + barOffset,
        boxY + barOffset,
        (boxWidth - barOffset * 2) * value,
        boxHeight / 2,
        8
      );
      percent.setText(`${parseInt(value * 100)}%`);
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loading.destroy();
    });

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
    load.audio(sounds.puke, require('../assets/sounds/puke.mp3'));
    load.audio(sounds.joy, require('../assets/sounds/joy.mp3'));
    load.audio(sounds.pop, require('../assets/sounds/pop.mp3'));
    load.audio(sounds.whoosh, require('../assets/sounds/whoosh.mp3'));
    load.audio(sounds.stop, require('../assets/sounds/stop.mp3'));
    load.audio(sounds.ding, require('../assets/sounds/ding.mp3'));
    load.audio(sounds.heartbeat, require('../assets/sounds/heartbeat.mp3'));
  }

  create() {
    this.scene.start(scenes.main);
  }
}
