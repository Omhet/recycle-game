import { GameObjects } from 'phaser';

export default class Text extends GameObjects.Text {
  constructor({ scene, text, x, y, fontSize }) {
    super(scene, x, y, text, {
      align: 'center',
      fontSize,
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
    scene.add.existing(this);
  }
}
