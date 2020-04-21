import {
  scenes,
  gameOptions,
  images,
  objects,
  animations,
  sounds,
} from '../constants';
import Phaser, { Scene } from 'phaser';
import { WasteFactory, BinFactory } from '../sprites';
import {
  isIntersecting,
  LevelManager,
  getAnimationName,
  getImageSize,
} from '../utils';
import { Score, GameOver, Lives } from '../gui';

export default class Main extends Scene {
  constructor() {
    super({ key: scenes.main });
  }

  create() {
    const { width, height } = this.game.config;
    const { showStartScreen, lives } = gameOptions;

    // World
    const wallOffset = 200;
    this.worldBounds = this.matter.world.setBounds(
      -wallOffset,
      0,
      width + wallOffset * 2,
      height + wallOffset
    );

    // General
    this.levelManager = new LevelManager();
    this.lives = lives;
    this.binsFilled = 0;
    this.menuGroup = this.add.group();
    // this.guiGroup = this.add.group();

    this.music = this.sound.add(sounds.main, { loop: true, volume: 0.1 });

    this.addBackground();
    this.addAnimations();

    // Waste
    this.wasteFactory = new WasteFactory({ scene: this });
    this.wastes = [];

    // Bin
    this.binFactory = new BinFactory({ scene: this });
    // this.bin = this.binFactory.getRandomBin({ x: width / 2 });

    // Controls
    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);

    if (showStartScreen) {
      this.showStartScreen();
    } else {
      this.startGame();
    }
  }

  showStartScreen() {
    const { width, height } = this.game.config;

    const logoScale = width <= 960 ? 0.85 : 1;
    const logo = this.add
      .image(width / 2, height / 4, images.logo)
      .setScale(logoScale);
    this.menuGroup.add(logo);

    const play = this.add
      .image(width / 2, height - height / 4, images.play)
      .setOrigin(0.5, 1)
      .setInteractive();
    this.tweens.add({
      targets: play,
      scale: '+=0.05',
      repeat: -1,
      duration: 600,
      repeatDelay: 3000,
      ease: 'Back.easeOut',
      yoyo: true,
    });
    this.menuGroup.add(play);

    play.once('pointerdown', () => {
      this.menuGroup.toggleVisible();
      this.menuGroup.active = false;
      this.startGame();
    });
  }

  addBackground() {
    const { width, height } = this.game.config;
    this.add
      .image(-100, 0, objects.back.gradient)
      .setOrigin(0, 0)
      .setDisplaySize(width + 100, height);

    const floorTop = this.fillSceneContinuous(objects.back.floor, height);
    const pavementTop = this.fillScene(objects.back.pavement, floorTop);
    const grassTop = this.fillSceneContinuous(objects.back.grass, pavementTop);
    this.fillScene(objects.back.cityBack, grassTop - 20);
    this.fillScene(objects.back.city, grassTop);
    this.fillScene(objects.back.shrub, grassTop);

    this.addClouds();
  }

  addClouds() {
    const { width } = this.game.config;
    const leftToRight = Phaser.Math.Between(0, 1) === 1;
    this.cloudTimer = this.time.addEvent({
      delay: width * 12,
      callback: () => {
        this.addCloud(leftToRight);
      },
      callbackScope: this,
      loop: true,
    });
    this.addCloud(leftToRight);
  }

  addCloud(leftToRight) {
    const { width } = this.game.config;
    const index = Phaser.Math.Between(0, 2);
    const scale = Phaser.Math.RND.realInRange(0.6, 1).toFixed(2);
    const offset = 300;
    const [initX, finalX] = leftToRight
      ? [-offset, width + offset]
      : [width + offset, -offset];
    const key = objects.back.clouds[`cloud${index}`];

    const cloud = this.add
      .image(initX, 100, key)
      .setOrigin(0, 0)
      .setScale(scale);
    this.tweens.add({
      targets: [cloud],
      x: {
        value: {
          getEnd: () => finalX,
        },
      },
      duration: width * 30,
      callbackScope: this,
      onComplete: () => cloud.destroy(),
    });
  }

  fillSceneContinuous(key, y) {
    const { width } = this.game.config;
    const { height: imageHeight } = getImageSize.call(this, key);
    this.add
      .image(-100, y, key)
      .setOrigin(0, 1)
      .setDisplaySize(width + 200, imageHeight);

    return y - imageHeight;
  }

  fillScene(key, y) {
    const { width } = this.game.config;
    const { width: imageWidth, height: imageHeight } = getImageSize.call(
      this,
      key
    );
    const images = Math.ceil(width / imageWidth);
    const offset = Math.floor(Math.abs(width - images * imageWidth) / 2);
    for (let i = 0; i < images; i++) {
      this.add.image(i * imageWidth - offset, y, key).setOrigin(0, 1);
    }

    return y - imageHeight;
  }

  getImageSize(key) {
    const tex = this.textures.get(key);
    const { width, height } = tex.getSourceImage();
    return { width, height };
  }

  addAnimations() {
    for (const bin of Object.values(objects.bin)) {
      this.addBinAnimations(bin);
    }
  }

  addBinAnimations(bin) {
    for (const anim of Object.values(animations.bin)) {
      const animName = getAnimationName(bin, anim);
      const isIdle = anim === animations.bin.idle;
      const isDead = anim === animations.bin.dead;
      const frameRate = isIdle ? 80 : 30;
      const repeat = isIdle ? -1 : isDead ? 0 : 1;
      this.anims.create({
        key: animName,
        frames: this.anims.generateFrameNumbers(animName),
        frameRate,
        repeat,
      });
    }
  }

  startGame() {
    this.music.play();
    gameOptions.showStartScreen = false;
    this.startWasteTimer();
    this.addScore();
    this.livesGUI = new Lives({ scene: this, lives: this.lives });
  }

  gameOver() {
    this.music.stop();
    this.sound.play(sounds.stop, { volume: 0.2 });
    this.wasteTimer.destroy();
    this.bin.die();
    this.scoreGUI.dispose();
    const gameOverGUI = new GameOver({ scene: this });
    this.input.once('pointerdown', () => {
      gameOverGUI.destroy();
      this.bin.binImage.destroy();
      this.cameras.main.flash(350, 255, 255, 255, false, (cam, progress) => {
        if (progress === 1) {
          this.scene.restart();
        }
      });
    });
  }

  addScore() {
    this.score = 0;
    this.scoreGUI = new Score({ scene: this, text: this.score });
  }

  handleWasteCollideWalls({ gameObjectA: waste }) {
    this.diposeWaste(waste);
  }

  handleWasteCollideBin({ gameObjectA: waste }) {
    if (waste.body.velocity.y > 0) {
      this.hitBin(waste);
    }
  }

  hitBin(waste) {
    this.diposeWaste(waste);
    const typeMatch = this.bin.checkIfTypeMatch(waste.type);

    if (typeMatch) {
      this.scoreGUI.setScore(++this.score);
      this.bin.hitRight();
    } else {
      this.bin.hitWrong();
      this.cameras.main.shake(100, 0.01);
      this.lives--;
      this.livesGUI.decreaseLives();
    }

    if (this.lives <= 0) {
      this.gameOver();
    }

    if (this.bin.checkIfFull(this.levelManager.fillLimit)) {
      this.replaceBin();
    }
  }

  replaceBin() {
    const { width } = this.game.config;

    this.wasteTimer.destroy();
    this.moveWasteAway();
    this.sound.play(sounds.ding, { volume: 0.8 });

    this.tweens.add({
      targets: [this.bin, this.bin.binImage],
      y: '-=300',
      angle: `+=${Phaser.Math.Between(0, 1) === 0 ? 15 : -15}`,
      duration: 300,
      callbackScope: this,
      yoyo: true,
      ease: 'Cubic.easeOut',
      onComplete: oldBinJumped,
    });
    function oldBinJumped() {
      this.sound.play(sounds.whoosh, { rate: 0.5 });
      this.tweens.add({
        targets: [this.bin, this.bin.binImage],
        x: -this.bin.binImage.width,
        duration: 500,
        ease: 'Cubic.easeIn',
        callbackScope: this,
        onComplete: oldBinMoved,
      });
    }
    function oldBinMoved() {
      this.sound.play(sounds.whoosh, { rate: 0.55 });
      this.bin.destroy();
      this.bin = this.binFactory.getRandomBinExceptOf({
        type: this.bin.type,
        x: width + this.bin.binImage.width,
      });

      this.tweens.add({
        targets: [this.bin, this.bin.binImage],
        x: width / 2,
        duration: 500,
        delay: 150,
        callbackScope: this,
        ease: 'Cubic.easeOut',
        onComplete: this.startNewLevel,
      });
    }
  }

  moveWasteAway() {
    for (const waste of this.wastes) {
      const dir = waste.body.velocity.x > 0 ? 1 : -1;
      waste.setVelocity(20 * dir, -20);
    }
  }

  startNewLevel() {
    this.levelManager.levelUp(++this.binsFilled);
    this.startWasteTimer();
  }

  diposeWaste(waste) {
    const wasteIndex = this.wastes.findIndex(el => el === waste);
    this.wastes.splice(wasteIndex, 1);
    waste.dispose();
  }

  startWasteTimer() {
    if (this.wasteTimer) {
      this.wasteTimer.destroy();
    }

    this.wasteTimer = this.time.addEvent({
      delay: this.levelManager.wasteThrowDelay,
      callback: this.throwWaste,
      callbackScope: this,
      loop: true,
    });
  }

  createWasteOfBinType() {
    const waste = this.wasteFactory.getWasteOfType(this.bin.type);
    this.addCollisionToWaste(waste);
    this.wastes.push(waste);
    return waste;
  }

  createRandomWaste() {
    const waste = this.wasteFactory.getRandomWaste({
      neededType: this.bin.type,
      probability: this.levelManager.wasteProbability,
    });
    this.addCollisionToWaste(waste);
    this.wastes.push(waste);
    return waste;
  }

  addCollisionToWaste(waste) {
    this.matterCollision.addOnCollideStart({
      objectA: waste,
      objectB: [
        this.worldBounds.walls.left,
        this.worldBounds.walls.right,
        this.worldBounds.walls.bottom,
      ],
      callback: this.handleWasteCollideWalls,
      context: this,
    });
    this.matterCollision.addOnCollideStart({
      objectA: waste,
      objectB: [this.bin],
      callback: this.handleWasteCollideBin,
      context: this,
    });
    this.matterCollision.addOnCollideStart({
      objectA: waste,
      objectB: this.wastes,
      callback: () => {
        const detune = Phaser.Math.Between(-300, 300);
        this.sound.play(sounds.pop, { detune });
      },
      context: this,
    });
  }

  throwWaste() {
    if (this.wastes.length < this.levelManager.numberOfWastes) {
      const waste = this.createRandomWaste();
      waste.throwWithRandomAngle();
    }
  }

  handleSwipe({ x, y, left, right, up, down }) {
    const vel = 20;
    this.wastes.forEach(waste => {
      if (isIntersecting(waste, { x, y }, 50)) {
        const detune = Phaser.Math.Between(-300, 300);
        this.sound.play(sounds.whoosh, { detune });
        let velX = left ? -vel : right ? vel : 0;
        let velY = up ? -vel : down ? vel : 0;
        waste.setVelocity(velX, velY);
      }
    });
  }
}
