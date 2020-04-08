import { scenes, gameOptions, images } from '../constants';
import { Scene } from 'phaser';
import { WasteFactory, BinFactory } from '../sprites';
import { isIntersecting } from '../utils/misc';
import { Score } from '../texts';

export default class Main extends Scene {
  constructor() {
    super({ key: scenes.main });
  }

  create() {
    const { width, height } = this.game.config;
    const { lives, showStartScreen } = gameOptions;

    // World
    const wallOffset = 200;
    this.worldBounds = this.matter.world.setBounds(
      -wallOffset,
      0,
      width + wallOffset * 2,
      height + wallOffset
    );

    // General
    this.lives = lives;

    // Waste
    this.wasteFactory = new WasteFactory({ scene: this });
    this.wastes = [];

    // Bin
    this.binFactory = new BinFactory({ scene: this });
    this.bin = this.binFactory.getRandomBin();

    // Controls
    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);

    if (showStartScreen) {
      this.logo = this.add.image(width / 2, 128, images.logo);
      const waste = this.createWaste();
      waste
        .setPosition(width / 2, height / 2)
        .setVisible(true)
        .setStatic(true);
      this.input.once('pointerdown', () => {
        waste.setStatic(false);
        this.startGame();
      });
    } else {
      this.startGame();
    }
  }

  startGame() {
    gameOptions.showStartScreen = false;
    this.startWasteTimer();
    this.addScore();
    if (this.logo) {
      this.logo.destroy();
    }
  }

  gameOver() {
    this.wasteTimer.destroy();
    this.cameras.main.flash(350, 255, 255, 255, false, (cam, progress) => {
      if (progress === 1) {
        this.scene.restart();
      }
    });
  }

  addScore() {
    this.score = 0;
    this.scoreText = new Score({ scene: this, text: this.score });
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
      this.scoreText.setScore(++this.score);
      this.bin.increaseFill();
    } else {
      this.lives--;
    }

    if (this.lives <= 0) {
      this.gameOver();
    }

    if (this.bin.checkIfFull()) {
      this.bin = this.binFactory.getRandomBin();
    }
  }

  diposeWaste(waste) {
    const wasteIndex = this.wastes.findIndex(el => el === waste);
    this.wastes.splice(wasteIndex, 1);
    waste.dispose();
  }

  startWasteTimer() {
    this.wasteTimer = this.time.addEvent({
      delay: 1000,
      callback: this.throwWaste,
      callbackScope: this,
      loop: true,
    });
  }

  createWaste() {
    const waste = this.wasteFactory.getRandomWaste();

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

    this.wastes.push(waste);

    return waste;
  }

  throwWaste() {
    if (this.wastes.length < 1) {
      const waste = this.createWaste();
      waste.throw();
    }
  }

  handleSwipe({ x, y, left, right, up, down }) {
    const vel = 20;
    this.wastes.forEach(waste => {
      if (isIntersecting(waste, { x, y }, 50)) {
        let velX = left ? -vel : right ? vel : 0;
        let velY = up ? -vel : down ? vel : 0;
        waste.setVelocity(velX, velY);
      }
    });
  }
}
