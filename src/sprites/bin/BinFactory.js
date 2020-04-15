// import { Plastic, Glass, Metal, Paper } from './types';
import { Plastic } from './types';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    // this.binTypes = [Plastic, Glass, Metal, Paper];
    this.binTypes = [Plastic];
  }
  getRandomBin(x) {
    const type = Phaser.Math.RND.pick(this.binTypes);
    return new type({ scene: this.scene, x });
  }
}
