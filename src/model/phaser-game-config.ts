import { ChoiceScene } from '../scenes/choice.scene';
import { PlatformerScene } from '../scenes/platformer.scene';

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
  scene: [ChoiceScene, PlatformerScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 500 },
    },
  },
};
