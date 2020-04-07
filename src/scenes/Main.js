import { SCENES } from '../constants';
import Phaser, { Scene } from 'phaser';
import { Ball, Bin } from '../sprites';
import { isIntersecting } from '../utils/misc';
import { gameOptions } from '../index';

export default class Main extends Scene {
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {
    const { width, height } = this.game.config;

    this.worldBounds = this.matter.world.setBounds(0, 0, width, height);

    // Balls
    this.cellsNum = Math.floor(width / gameOptions.ballSize);
    this.balls = [];
    this.startBallTimer();

    // Bin
    this.bin = new Bin({ scene: this });

    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);
  }

  handleBallCollideWalls({ gameObjectA: ball }) {
    this.diposeBall(ball);
  }

  handleBallCollideBin({ gameObjectA: ball }) {
    if (ball.body.velocity.y > 0) {
      this.diposeBall(ball);
    }
  }

  diposeBall(ball) {
    const ballIndex = this.balls.findIndex(el => el === ball);
    this.balls.splice(ballIndex, 1);
    ball.die();
  }

  startBallTimer() {
    this.ballTimer = this.time.addEvent({
      delay: 1000,
      callback: this.throwBall,
      callbackScope: this,
      loop: true,
    });
  }

  throwBall() {
    if (this.balls.length < 1) {
      const cell = Phaser.Math.Between(0, this.cellsNum);
      const ball = new Ball({ scene: this, cell });

      this.matterCollision.addOnCollideStart({
        objectA: ball,
        objectB: [
          this.worldBounds.walls.left,
          this.worldBounds.walls.right,
          this.worldBounds.walls.bottom,
        ],
        callback: this.handleBallCollideWalls,
        context: this,
      });
      this.matterCollision.addOnCollideStart({
        objectA: ball,
        objectB: [this.bin],
        callback: this.handleBallCollideBin,
        context: this,
      });

      this.balls.push(ball);
      ball.throw();
    }
  }

  handleSwipe({ x, y, left, right, up, down }) {
    const velXNom = 10;
    const velYNom = 20;
    this.balls.forEach(ball => {
      if (isIntersecting(ball, { x, y })) {
        let velX = left ? -velXNom : right ? velXNom : 0;
        let velY = up ? -velYNom : down ? velYNom : 0;
        ball.setVelocity(velX, velY);
      }
    });
  }
}
