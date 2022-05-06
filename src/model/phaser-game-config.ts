import { ChoiceScene, PlatformerScene, EndScene } from '../scenes';

const SCREEN_WIDTH = 640;
const SCREEN_HEIGTH = 480;

export const PHASER_GAME_CONFIG = {
  type: Phaser.AUTO,
  parent: 'game',
  width: SCREEN_WIDTH,
  heigth: SCREEN_HEIGTH,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGTH,
  },
  scene: [ChoiceScene, PlatformerScene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 500 },
    },
  },
};
