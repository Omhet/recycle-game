import './index.css';
import { Boot, Main } from './scenes';
import Phaser from 'phaser';
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
// import * as serviceWorker from './serviceWorker';

/**
 * @see {@link https://photonstorm.github.io/phaser3-docs/global.html#GameConfig}
 */
const config = {
  type: Phaser.CANVAS,
  title: 'Phaser Template',
  // the following 2 values are from `package.json`
  url: process.env.HOMEPAGE,
  version: process.env.VERSION,
  scene: [Boot, Main],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.9 },
      debug: process.env.NODE_ENV === 'development',
      enableSleeping: false,
    },
  },
  plugins: {
    scene: [
      {
        key: 'gestures',
        plugin: GesturesPlugin,
        mapping: 'gestures',
      },
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
  disableContextMenu: true,
  backgroundColor: 'rgb(168, 210, 234)',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
let gameOptions = {
  defaultSize: {
    width: 750,
    height: 1334,
    maxRatio: 4 / 3,
  },
};

window.onload = function() {
  let width = gameOptions.defaultSize.width;
  let height = gameOptions.defaultSize.height;
  let perfectRatio = width / height;
  let innerWidth = window.innerWidth;
  let innerHeight = window.innerHeight;
  let actualRatio = Math.min(
    innerWidth / innerHeight,
    gameOptions.defaultSize.maxRatio
  );
  if (perfectRatio > actualRatio) {
    height = width / actualRatio;
  } else {
    width = height * actualRatio;
  }

  config.scale.width = width;
  config.scale.height = height;

  new Phaser.Game(config);
  window.focus();
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
