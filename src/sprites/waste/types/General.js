import { objects } from '../../../constants';
import Waste from '../Waste';

export default class General extends Waste {
  constructor({ scene }) {
    super({ scene, key: objects.waste.general });
  }
}
