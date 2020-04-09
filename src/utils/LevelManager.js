export default class LevelManager {
  constructor() {
    this.level = 1;
    this.wasteThrowDelay = 1000;
    this.numberOfWastes = 1;
    this.lives = 4;
    this.binsThatLevelUp = [1, 3, 6, 9];
  }

  levelUp(bins) {
    const isUp = this.binsThatLevelUp.includes(bins);

    if (isUp) {
      this.level++;
    }

    switch (this.level) {
      case 2:
        this.wasteThrowDelay = 1000;
        this.numberOfWastes++;
        break;
      case 3:
        this.wasteThrowDelay = 900;
        this.lives--;
        break;
      case 4:
        this.wasteThrowDelay = 800;
        this.numberOfWastes++;
        break;
      case 5:
        this.wasteThrowDelay = 700;
        this.lives--;
        break;
      default:
        break;
    }
  }
}
