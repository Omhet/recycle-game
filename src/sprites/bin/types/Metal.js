import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Metal extends Bin {
  constructor({ scene }) {
    super({
      scene,
      key: objects.bin.metal,
      type: wasteType.metal,
    });
  }
}
