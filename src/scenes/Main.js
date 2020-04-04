import { SCENES } from '../constants';
import { Scene } from 'phaser';

export default class Main extends Scene {
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {}

  update(time, delta) {}
}
