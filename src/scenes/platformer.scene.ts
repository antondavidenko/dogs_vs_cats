import { PlayerComponent, FpsMeterComponent, PlatformerHudComponent, BackgroundComponent } from '../components';
import { CharacterStates } from '../components/player/player.model';
import { createPlatforms, createTilemapObjectsLayer, promiseDelay } from '../utils';
import { ScenesList } from './scenes-list';

export class PlatformerScene extends Phaser.Scene {

  private background: BackgroundComponent;
  private player: PlayerComponent;
  private hud: PlatformerHudComponent;
  private platformerData;
  private fpsMeter: FpsMeterComponent;
  private lastTime = 0;

  constructor() {
    super(ScenesList.PlatformerScene);
  }

  init(data) {
    this.player = new PlayerComponent(this, data.character);
    this.background = new BackgroundComponent(this);
    this.platformerData = { max: 0, collected: 0, life: 3 };
  }

  preload() {
    this.background.preload();
    const frame64 = { frameWidth: 64, frameHeight: 64 };
    this.load.spritesheet('tiles', 'assets/images/platformer_tilesheet.png', frame64);
    this.player.preload();
    this.load.tilemapTiledJSON('map', 'assets/levels/level1.json');
  }

  create() {
    this.physics.world.setFPS(300);

    const map = this.make.tilemap({ key: 'map' });

    this.background.create();

    const respawnSprite = createTilemapObjectsLayer(map, this, 'Respawn', 2).children.entries[0];
    this.player.create(respawnSprite);
    respawnSprite.visible = false;

    const finishGroup = createTilemapObjectsLayer(map, this, 'Finish', 2);
    finishGroup.children.entries[1].visible = false;

    const platforms = createPlatforms(map);
    const spikes = createTilemapObjectsLayer(map, this, 'Spikes', 2);
    const coins = createTilemapObjectsLayer(map, this, 'Coins', 2);
    this.platformerData.max = coins.children.entries.length;
    createTilemapObjectsLayer(map, this, 'Decor', 1);

    this.hud = new PlatformerHudComponent(this);
    this.physics.add.collider(this.player.player, spikes, this.hit, null, this);
    this.physics.add.overlap(this.player.player, coins, this.collect, null, this);
    this.physics.add.overlap(this.player.player, finishGroup, this.win, null, this);
    this.physics.add.collider(this.player.player, platforms);

    this.fpsMeter = new FpsMeterComponent(this, false);
  }

  update() {
    this.fpsMeter.update();

    this.player.update();
    const dx = Math.round(this.player.player.x);
    const dy = Math.round(this.player.player.y);
    this.cameras.main.pan(dx, dy - 75, 0);
    this.background.update(dx, dy);
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
