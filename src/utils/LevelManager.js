export default class LevelManager {
  constructor() {
    this.level = 0;
    this.wasteThrowDelay = 1000;
    this.numberOfWastes = 1;
    this.lives = 4;
  }

  levelUp() {
    this.level++;
  }
}
