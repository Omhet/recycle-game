import { GameObjects } from 'phaser';

export default class Player extends GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'KEY');
  }

  init() {}

  update() {}
}
