import { objects, wasteType } from '../../../constants';
import Waste from '../Waste';

export default class Glass extends Waste {
  constructor({ scene }) {
    super({
      scene,
      key: objects.waste.glass.bottle,
      type: wasteType.glass,
    });
  }
}
