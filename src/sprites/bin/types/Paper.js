import { objects, wasteType } from '../../../constants';
import Bin from '../Bin';

export default class Paper extends Bin {
  constructor({ scene, x }) {
    super({
      scene,
      x,
      key: objects.bin.paper,
      type: wasteType.paper,
    });
  }
}
