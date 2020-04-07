import { General, Plastic } from './types';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    this.wasteTypes = [General, Plastic];
  }
  getRandomWaste() {
    const type = Phaser.Math.RND.pick(this.wasteTypes);
    return new type({ scene: this.scene });
  }
}
