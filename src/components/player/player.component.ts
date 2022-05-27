import { CharacterTypes } from '../../scenes';
import { createOneFrameAnimation, createMultiFramesAnimation } from '../../utils';
import { CharacterStates, PlayerAssetsModel, PLAYER_VELOCITY } from './player.model';

export class PlayerComponent {

  public player;
  private respawnPoint: Phaser.Geom.Point;
  private playerState: CharacterStates = CharacterStates.NORMAL;
  private assetsModel: PlayerAssetsModel;

  constructor(private scene: Phaser.Scene, private assetId) {
    this.assetsModel = new PlayerAssetsModel(this.assetId);
  }

  preload(): void {
    this.scene.load.spritesheet(
      this.assetsModel.atlasId,
      this.assetsModel.atlasUrl,
      { frameWidth: 192 },
    );
  }

  create(respawnPoint: Phaser.Geom.Point): void {
    this.setRespawnPoint(respawnPoint);
    this.player = this.scene.physics.add.sprite(
      this.respawnPoint.x,
      this.respawnPoint.y,
      this.assetsModel.atlasId,
    );
    this.player.setBounce(0.2);
    this.player.body.width = 120;
    this.player.body.height = 120;
    this.player.body.offset = { x: 36, y: 72 };
    this.player.setDepth(10);

    createOneFrameAnimation(this.scene, this.assetsModel.getAnimationId('idle'), 0, this.assetsModel.atlasId);
    createOneFrameAnimation(this.scene, this.assetsModel.getAnimationId('jump'), 1, this.assetsModel.atlasId);
    createMultiFramesAnimation(this.scene, this.assetsModel.getAnimationId('walk'), 2, 0, this.assetsModel.atlasId);

    this.player.setFlipX(this.assetId === CharacterTypes.CAT);
  }

  setRespawnPoint(respawnPoint: Phaser.Geom.Point): void {
    const { x, y } = respawnPoint;
    this.respawnPoint = new Phaser.Geom.Point(x + 68, y);
  }

  update() {
    if (this.state === CharacterStates.NORMAL || this.state === CharacterStates.BLINK) {
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
      .play(this.assetsModel.getAnimationId('idle'), true);
  }

  get state(): CharacterStates {
    return this.playerState;
  }

  set state(value: CharacterStates) {
    this.playerState = value;
    new Map([
      [CharacterStates.BLINK, () => { this.blinking(); }],
      [CharacterStates.LOSE, () => { this.player.visible = false; }],
      [CharacterStates.WIN, () => { this.player.play(this.assetsModel.getAnimationId('jump'), true); }],
      [CharacterStates.NORMAL, () => { }],
    ]).get(this.playerState)();
  }

  private blinking() {
    this.scene.tweens.add({
      targets: this.player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
      onComplete: () => { this.state = CharacterStates.NORMAL; },
    });
  }

  private move() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.horizonalMove(-1 * PLAYER_VELOCITY.X, this.assetsModel.getAnimationId('walk'));
    } else if (cursors.right.isDown) {
      this.horizonalMove(PLAYER_VELOCITY.X, this.assetsModel.getAnimationId('walk'));
    } else {
      this.horizonalMove(0, this.assetsModel.getAnimationId('idle'));
    }

    if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-1 * PLAYER_VELOCITY.Y);
      this.player.play(this.assetsModel.getAnimationId('jump'), true);
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
