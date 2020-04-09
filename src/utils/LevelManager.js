export default class LevelManager {
  constructor() {
    this.level = 0;
    this.wasteThrowDelay = 1000;
    this.numberOfWastes = 1;
    this.lives = 4;
  }

  levelUp() {
    this.level++;

    switch (this.level) {
      case 1:
        this.wasteThrowDelay = 1000;
        this.numberOfWastes = 2;
        this.lives = 3;
        break;
      case 2:
        this.wasteThrowDelay = 800;
        this.numberOfWastes = 2;
        break;
      default:
        break;
    }
  }
}
