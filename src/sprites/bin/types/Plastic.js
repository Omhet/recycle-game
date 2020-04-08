import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Plastic extends Bin {
  constructor({ scene }) {
    super({
      scene,
      key: objects.bin.plastic,
      type: wasteType.plastic,
    });
  }
}
