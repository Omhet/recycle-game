import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Glass extends Bin {
  constructor({ scene, x }) {
    super({
      scene,
      x,
      key: objects.bin.glass,
      type: wasteType.glass,
    });
  }
}
