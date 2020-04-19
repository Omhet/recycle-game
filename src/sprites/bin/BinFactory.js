import { Plastic, Glass, Metal, Paper } from './types';
import { wasteType } from '../../constants';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    this.binTypes = [Plastic, Glass, Metal, Paper];
  }
  getRandomBin({ x, types = this.binTypes }) {
    const randomType = Phaser.Math.RND.pick(types);
    return new randomType({ scene: this.scene, x });
  }
  getRandomBinExceptOf({ x, type }) {
    const types = this.binTypes.filter(t => this.getOfType(type) !== t);
    return this.getRandomBin({ x, types });
  }
  getOfType(type) {
    switch (type) {
      case wasteType.glass:
        return Glass;
      case wasteType.plastic:
        return Plastic;
      case wasteType.metal:
        return Metal;
      case wasteType.paper:
        return Paper;
      default:
        return;
    }
  }
}
