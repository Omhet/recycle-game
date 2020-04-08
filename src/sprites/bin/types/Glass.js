import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Glass extends Bin {
  constructor({ scene }) {
    super({
      scene,
      key: objects.bin.glass,
      type: wasteType.glass,
    });
  }
}
