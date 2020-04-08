import { General, Plastic, Glass, Metal, Paper } from './types';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    this.wasteTypes = [General, Plastic, Glass, Metal, Paper];
  }
  getRandomWaste() {
    const type = Phaser.Math.RND.pick(this.wasteTypes);
    return new type({ scene: this.scene });
  }
}
