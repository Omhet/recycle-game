import { SCENES } from '../constants';
import { Scene } from 'phaser';
import { Ball } from '../sprites';
import { isIntersecting } from '../utils/misc';

export default class Main extends Scene {
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {
    const { width, height } = this.game.config;

    this.worldBounds = this.matter.world.setBounds(0, 0, width, height);

    this.addBalls();
    this.startBallTimer();

    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);
  }

  addBalls() {
    this.ballsInAir = [];
    this.balls = new Array(4).fill(null).map(() => {
      return new Ball({ scene: this });
    });

    this.matterCollision.addOnCollideStart({
      objectA: this.balls,
      objectB: [this.worldBounds.walls.left, this.worldBounds.walls.right],
      callback: this.handleBallCollideWalls,
    });
  }

  handleBallCollideWalls() {
    console.log('wall');
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
    if (this.balls.length > 0) {
      const ball = this.balls.pop();
      this.ballsInAir.push(ball);
      ball.throw();
    }
  }

  handleSwipe({ x, y, left, right, up, down }) {
    const velXNom = 10;
    const velYNom = 20;
    this.ballsInAir.forEach(ball => {
      if (isIntersecting(ball, { x, y })) {
        let velX = left ? -velXNom : right ? velXNom : 0;
        let velY = up ? -velYNom : down ? velYNom : 0;
        ball.setVelocity(velX, velY);
      }
    })
  }
}
