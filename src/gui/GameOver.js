import { GameObjects } from 'phaser';

export default class GameOver extends GameObjects.Text {
  constructor({ scene }) {
    const { width, height } = scene.game.config;
    const text = `WASTED\n\nTAP OR CLICK TO RESTART`;
    super(scene, width / 2, height / 3, text, {
      align: 'center',
      fontSize: 72,
      fontStyle: 'bold',
      shadow: {
        offsetX: 3,
        offsetY: 1,
        color: '#6ea2d0',
        fill: true,
      },
      wordWrap: {
        width: scene.game.config.width,
        useAdvancedWrap: true,
      },
    });
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
  }
}
