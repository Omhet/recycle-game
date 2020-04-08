import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Paper extends Bin {
  constructor({ scene }) {
    super({
      scene,
      key: objects.bin.paper,
      type: wasteType.paper,
    });
  }
}
