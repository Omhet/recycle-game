import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Metal extends Bin {
  constructor({ scene, x }) {
    super({
      scene,
      x,
      key: objects.bin.metal,
      type: wasteType.metal,
    });
  }
}
