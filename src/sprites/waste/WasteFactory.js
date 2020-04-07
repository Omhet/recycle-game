import General from './General';

export default class WasteFactory {
  constructor({ scene }) {
    this.scene = scene;
  }
  getRandomWaste() {
    return new General({ scene: this.scene });
  }
}
