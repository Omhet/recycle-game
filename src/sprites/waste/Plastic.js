import { objects } from '../../constants';
import Waste from './Waste';

export default class Plastic extends Waste {
  constructor({ scene }) {
    super({ scene, key: objects.waste.plastic.bottle });
  }
}
