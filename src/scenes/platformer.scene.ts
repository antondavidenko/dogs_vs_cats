import { PlayerComponent, FpsMeterComponent, PlatformerHudComponent, BackgroundComponent, LevelComponent } from '../components';
import { CharacterStates } from '../components/player/player.model';
import { promiseDelay } from '../utils';
import { ScenesList } from './scenes-list';

export class PlatformerScene extends Phaser.Scene {

  private background: BackgroundComponent;
  private player: PlayerComponent;
  private hud: PlatformerHudComponent;
  private platformerData;
  private fpsMeter: FpsMeterComponent;
  private lastTime = 0;
  private level: LevelComponent;
  private heightInPixels: number;

  constructor() {
    super(ScenesList.PlatformerScene);
  }

  init(data) {
    this.hud = new PlatformerHudComponent(this);
    this.player = new PlayerComponent(this, data.character);
    this.level = new LevelComponent(this, data.level);
    this.background = new BackgroundComponent(this, data.level);
    this.platformerData = { max: 0, collected: 0, life: 3 };
  }

  preload() {
    this.background.preload();
    this.hud.preload();
    this.player.preload();
    this.level.preload();
  }

  async create() {
    this.background.create();
    const levelPayload = this.level.create();
    this.heightInPixels = levelPayload.heightInPixels;
    this.player.create(levelPayload.respawnPoint);
    this.fpsMeter = new FpsMeterComponent(this, false);
    this.platformerData.max = levelPayload.coinsCount;
    await this.hud.create();
    this.physics.add.collider(this.player.player, levelPayload.spikes, this.hit, null, this);
    this.physics.add.overlap(this.player.player, levelPayload.coins, this.collect, null, this);
    this.physics.add.overlap(this.player.player, levelPayload.finishGroup, this.win, null, this);
    this.physics.add.overlap(this.player.player, levelPayload.checkPoints, this.check, null, this);
    this.physics.add.collider(this.player.player, levelPayload.platforms);
    this.physics.add.collider(this.player.player, levelPayload.base);
  }

  update() {
    this.fpsMeter.update();
    this.player.update();
    const dx = Math.round(this.player.player.x);
    const dy = Math.round(this.player.player.y);
    const maxY = this.heightInPixels + 1145;
    const maxCamY = maxY + 225;
    const cameraY = dy - 25 < maxCamY ? dy - 25 : maxCamY;
    this.cameras.main.pan(dx, cameraY, 0);
    const maxBgY = maxY;
    const BgY = dy - 25 < maxBgY ? dy - 25 : maxBgY;
    this.background.update(dx, BgY);
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

  private collect(_player, item): void {
    item.destroy();
    this.platformerData.collected++;
  }

  private async win() {
    if (this.player.state === CharacterStates.NORMAL) {
      this.player.state = CharacterStates.WIN;
      await promiseDelay(500);
      this.scene.start(ScenesList.EndScene, { win: true });
    }
  }

  private check(_player, item) {
    this.player.setRespawnPoint(item);
  }

}
