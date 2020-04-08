import { objects, wasteType } from '../../../constants';
import Waste from '../Waste';

export default class Metal extends Waste {
  constructor({ scene }) {
    super({
      scene,
      key: objects.waste.metal.can,
      type: wasteType.metal,
    });
  }
}
