import { createOneFrameAnimation, createMultiFramesAnimation } from '../../utils';
import { CharacterStates, PLAYER_VELOCITY } from './player.model';

export class PlayerComponent {

  public player;
  private respawnPoint: Phaser.Geom.Point;
  private state: CharacterStates = CharacterStates.NORMAL;

  constructor(private scene: Phaser.Scene) { }

  preload(character): void {
    const frame96 = { frameWidth: 96, frameHeight: 96 };
    this.scene.load.spritesheet('player', `assets/images/player_${character}.png`, frame96);
  }

  create(respawnPoint: {x: number, y: number}): void {
    const { x, y } = respawnPoint;
    this.respawnPoint = new Phaser.Geom.Point(x + 34, y + 18);
    this.player = this.scene.physics.add.sprite(this.respawnPoint.x, this.respawnPoint.y, 'player');
    this.player.setBounce(0.2);
    this.player.body.width = 60;
    this.player.body.height = 60;
    this.player.body.offset = { x: 18, y: 36 };
    this.player.setDepth(10);

    createOneFrameAnimation(this.scene, 'idle', 0);
    createOneFrameAnimation(this.scene, 'jump', 1);
    createMultiFramesAnimation(this.scene, 'walk', 2, 3);
  }

  update() {
    if (this.player.visible) {
      this.move();
    } else {
      this.player.setVelocity(0, 0);
    }
  }

  respawn() {
    this.player
      .setVelocity(0, 0)
      .setX(this.respawnPoint.x)
      .setY(this.respawnPoint.y)
      .setAlpha(0)
      .play('idle', true);
  }

  blinking() {
    this.scene.tweens.add({
      targets: this.player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
  }

  private move() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.horizonalMove(-1 * PLAYER_VELOCITY.X, 'walk');
    } else if (cursors.right.isDown) {
      this.horizonalMove(PLAYER_VELOCITY.X, 'walk');
    } else {
      this.horizonalMove(0, 'idle');
    }

    if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-1 * PLAYER_VELOCITY.Y);
      this.player.play('jump', true);
    }

    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      this.player.setFlipX(true);
    }
  }

  private horizonalMove(velocity, state) {
    this.player.setVelocityX(velocity);
    if (this.player.body.onFloor()) {
      this.player.play(state, true);
    }
  }

}
