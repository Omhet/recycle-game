import { scenes, gameOptions, images, objects, animations } from '../constants';
import { Scene } from 'phaser';
import { WasteFactory, BinFactory } from '../sprites';
import { isIntersecting, LevelManager, getAnimationName } from '../utils';
import { Score, Level, GameOver } from '../texts';

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

    this.addAnimations();

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
      const waste = this.createWasteOfBinType();
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
    this.bin.die();
    new GameOver({ scene: this });
    // this.cameras.main.flash(350, 255, 255, 255, false, (cam, progress) => {
    //   if (progress === 1) {
    //     this.scene.restart();
    //   }
    // });
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
      this.bin.hitRight();
    } else {
      this.bin.hitWrong();
      this.cameras.main.shake(100, 0.01);
      this.lives--;
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
    this.levelText.setLevel(this.levelManager.level);
    this.lives = this.levelManager.lives;
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
  }

  throwWaste() {
    if (this.wastes.length < this.levelManager.numberOfWastes) {
      const waste = this.createRandomWaste();
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
