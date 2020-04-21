export default class LevelManager {
  constructor() {
    this.level = 1;
    this.wasteThrowDelay = 1000;
    this.numberOfWastes = 1;
    this.binsThatLevelUp = [1, 3, 6, 9];
    this.fillLimit = 3;
    this.wasteProbability = 50;
  }

  levelUp(bins) {
    if (bins % 2 === 0) {
      this.level++;
    }

    switch (this.level) {
      case 2:
        this.wasteThrowDelay = 1000;
        this.numberOfWastes = 3;
        this.wasteProbability = 40;
        break;
      case 3:
        this.wasteThrowDelay = 700;
        this.wasteProbability = 35;
        break;
      case 4:
        this.wasteThrowDelay = 600;
        this.numberOfWastes = 4;
        this.wasteProbability = 30;

        break;
      case 5:
        this.wasteThrowDelay = 500;
        this.numberOfWastes = 5;
        this.wasteProbability = 25;
        break;
      default:
        break;
    }

    if (this.level > 5) {
      this.wasteThrowDelay -= 10;
      this.wasteThrowDelay = Math.max(200, this.wasteThrowDelay);
      if (this.level % 2 === 0) {
        this.numberOfWastes++;
      }
    }
  }
}
