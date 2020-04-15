import { objects, wasteType } from '../../../constants';
import Waste from '../Waste';

export default class Paper extends Waste {
  constructor({ scene }) {
    super({
      scene,
      key: objects.waste.paper.ball,
      type: wasteType.paper,
    });
  }
}
