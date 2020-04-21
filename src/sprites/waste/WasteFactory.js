import { General, Plastic, Glass, Metal, Paper } from './types';
import { wasteType } from '../../constants';
import Phaser from 'phaser';
export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
    this.wasteTypes = [General, Plastic, Glass, Metal, Paper];
  }
  getRandomWaste({ neededType, probability } = {}) {
    const shouldGiveNeededType =
      Phaser.Math.Between(0, 100) >= 100 - probability;
    const type =
      neededType && shouldGiveNeededType
        ? this.getOfType(neededType)
        : Phaser.Math.RND.pick(this.wasteTypes);

    return new type({ scene: this.scene });
  }

  getWasteOfType(neededType) {
    const type = this.getOfType(neededType);
    return new type({ scene: this.scene });
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
        return General;
    }
  }
}
