import { Plastic } from './types';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    this.binTypes = [Plastic];
  }
  getRandomBin() {
    const type = Phaser.Math.RND.pick(this.binTypes);
    return new type({ scene: this.scene });
  }
}
