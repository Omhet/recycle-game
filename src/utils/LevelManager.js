export default class LevelManager {
  constructor() {
    this.level = 1;
    this.wasteThrowDelay = 1000;
    this.numberOfWastes = 1;
    this.livesThrowDelay = 4000;
    this.binsThatLevelUp = [1, 3, 6, 9];
    this.fillLimit = 2;
    this.wasteProbability = 50;
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
        this.fillLimit++;
        this.wasteProbability = 40;
        break;
      case 3:
        this.wasteThrowDelay = 900;
        this.fillLimit++;
        this.wasteProbability = 35;
        break;
      case 4:
        this.wasteThrowDelay = 800;
        this.numberOfWastes++;
        this.fillLimit += 2;
        this.wasteProbability = 30;

        break;
      case 5:
        this.wasteThrowDelay = 700;
        this.fillLimit++;
        this.wasteProbability = 25;
        break;
      default:
        break;
    }
  }
}
