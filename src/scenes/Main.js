import { scenes, gameOptions, images } from '../constants';
import { Scene } from 'phaser';
import { WasteFactory, BinFactory } from '../sprites';
import { isIntersecting, LevelManager } from '../utils';
import { Score, Level } from '../texts';

export default class Main extends Scene {
  constructor() {
    super({ key: scenes.main });
  }

  create() {
    const { width, height } = this.game.config;
    const { showStartScreen } = gameOptions;

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
    this.lives = this.levelManager.lives;
    this.binsFilled = 0;

    // Waste
    this.wasteFactory = new WasteFactory({ scene: this });
    this.wastes = [];

    // Bin
    this.binFactory = new BinFactory({ scene: this });
    this.bin = this.binFactory.getRandomBin(width / 2);

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
    this.addLevel();
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

  addLevel() {
    this.levelText = new Level({ scene: this, text: this.levelManager.level });
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
      this.levelUp();
    }
  }

  levelUp() {
    this.wasteTimer.destroy();

    const { width } = this.game.config;

    this.moveOldBinTween = this.tweens.add({
      targets: [this.bin, this.bin.binImage],
      x: -500,
      duration: 500,
      callbackScope: this,
      onComplete: oldBinMoved,
    });
    function oldBinMoved() {
      this.bin.destroy();
      this.bin = this.binFactory.getRandomBin(width);

      this.moveNewBinTween = this.tweens.add({
        targets: [this.bin, this.bin.binImage],
        props: {
          x: {
            value: {
              getEnd: () => {
                return width / 2;
              },
            },
          },
        },
        duration: 500,
        callbackScope: this,
        onComplete: newBinMoved,
      });
    }

    function newBinMoved() {
      this.levelManager.levelUp(++this.binsFilled);
      this.levelText.setLevel(this.levelManager.level);
      this.lives = this.levelManager.lives;
      this.startWasteTimer();
    }
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
    if (this.wastes.length < this.levelManager.numberOfWastes) {
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
