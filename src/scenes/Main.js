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

    const swipe = this.gestures.add.swipe({
      threshold: 1,
      velocityThreshold: 1,
      direction: '8dir',
    });
    swipe.on('swipe', this.handleSwipe, this);
  }

  addBalls() {    
    this.balls = new Array(2).fill(null).map(() => {
      const ball = new Ball({ scene: this });
      ball.setVisible(false);
      return ball;
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

  handleSwipe({ x, y, left, right, up, down }) {
    const velXNom = 10;
    const velYNom = 20;
    if (isIntersecting(this.ball, { x, y })) {
      let velX = left ? -velXNom : right ? velXNom : 0;
      let velY = up ? -velYNom : down ? velYNom : 0;
      this.ball.setVelocity(velX, velY);
    }
  }
}
