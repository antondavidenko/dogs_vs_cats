import { ChoiceScene, PlatformerScene, EndScene } from '../scenes';

export const PHASER_GAME_CONFIG = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 640,
  heigth: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 480,
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
