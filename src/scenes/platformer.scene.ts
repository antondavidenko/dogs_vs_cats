import { PlayerComponent, FpsMeterComponent, PlatformerHudComponent, BackgroundComponent, LevelComponent } from '../components';
import { CharacterStates } from '../components/player/player.model';
import { promiseDelay } from '../utils';
import { CharacterTypes } from './choice.scene';
import { ScenesList } from './scenes-list';

export class PlatformerScene extends Phaser.Scene {

  private background: BackgroundComponent;
  private player: PlayerComponent;
  private hud: PlatformerHudComponent;
  private platformerData;
  private fpsMeter: FpsMeterComponent;
  private lastTime = 0;
  private level: LevelComponent;

  constructor() {
    super(ScenesList.PlatformerScene);
  }

  init(data) {
    this.player = new PlayerComponent(this, data.character);
    const levelId = data.character === CharacterTypes.DOG ? 1 : 2;
    this.level = new LevelComponent(this, levelId);
    this.background = new BackgroundComponent(this);
    this.platformerData = { max: 0, collected: 0, life: 3 };
  }

  preload() {
    this.background.preload();
    const frame64 = { frameWidth: 64, frameHeight: 64 };
    this.load.spritesheet('tiles', 'assets/images/platformer_tilesheet.png', frame64);
    this.player.preload();
    this.level.preload();
  }

  create() {
    this.background.create();
    const levelPayload = this.level.create();
    this.player.create(levelPayload.respawnPoint);
    this.fpsMeter = new FpsMeterComponent(this, false);
    this.platformerData.max = levelPayload.coinsCount;
    this.hud = new PlatformerHudComponent(this);

    this.physics.add.collider(this.player.player, levelPayload.spikes, this.hit, null, this);
    this.physics.add.overlap(this.player.player, levelPayload.coins, this.collect, null, this);
    this.physics.add.overlap(this.player.player, levelPayload.finishGroup, this.win, null, this);
    this.physics.add.collider(this.player.player, levelPayload.platforms);
  }

  update() {
    this.fpsMeter.update();
    this.player.update();
    const dx = Math.round(this.player.player.x);
    const dy = Math.round(this.player.player.y);
    const cameraY = dy - 25 < 2400 ? dy - 25 : 2400;
    this.cameras.main.pan(dx, cameraY, 0);
    this.background.update(dx, cameraY);
    this.hud.update();
  }

  private async hit() {
    if (new Date().getTime() - this.lastTime > 100) {
      if (this.platformerData.life > 0) {
        this.platformerData.life--;
      }
      if (this.platformerData.life > 0) {
        this.player.respawn();
        this.player.state = CharacterStates.BLINK;
      } else if (this.player.state === CharacterStates.NORMAL) {
        this.player.state = CharacterStates.LOSE;
        await promiseDelay(500);
        this.scene.start(ScenesList.EndScene, { win: false });
      }
    }
    this.lastTime = new Date().getTime();
  }

  private collect(player, item): void {
    item.destroy();
    this.platformerData.collected++;
  }

  private async win(player, item) {
    if (this.player.state === CharacterStates.NORMAL) {
      this.player.state = CharacterStates.WIN;
      await promiseDelay(500);
      this.scene.start(ScenesList.EndScene, { win: true });
    }
  }

}
