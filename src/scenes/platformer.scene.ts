import { PlayerComponent, FpsMeterComponent, PlatformerHudComponent, BackgroundComponent } from '../components';
import { createPlatforms, createTilemapObjectsLayer } from '../utils/tilemap.factories';

export class PlatformerScene extends Phaser.Scene {

  private character;
  private background: BackgroundComponent;
  private player: PlayerComponent;
  private platforms;
  private spikes: Phaser.Physics.Arcade.Group;
  private coins: Phaser.Physics.Arcade.Group;
  private hud: PlatformerHudComponent;
  private platformerData;
  private fpsMeter: FpsMeterComponent;

  constructor() {
    super('PlatformerScene');
  }

  init(data) {
    this.character = data.character;
    this.player = new PlayerComponent(this);
    this.background = new BackgroundComponent(this);
  }

  preload() {
    this.background.preload();
    const frame64 = { frameWidth: 64, frameHeight: 64 };
    this.load.spritesheet('tiles', 'assets/images/platformer_tilesheet.png', frame64);
    this.player.preload(this.character);
    this.load.tilemapTiledJSON('map', 'assets/levels/level1.json');
  }

  create() {
    this.physics.world.setFPS(3000);

    const map = this.make.tilemap({ key: 'map' });

    this.background.create();

    const respawnSprite = createTilemapObjectsLayer(map, this, 'Respawn', 2).children.entries[0];
    this.player.create(respawnSprite);
    respawnSprite.visible = false;
    this.platforms = createPlatforms(map);
    this.spikes = createTilemapObjectsLayer(map, this, 'Spikes', 2);
    this.coins = createTilemapObjectsLayer(map, this, 'Coins', 2);
    createTilemapObjectsLayer(map, this, 'Decor', 1);

    this.platformerData = { max: this.coins.children.entries.length, collected: 0 };
    this.hud = new PlatformerHudComponent(this);

    this.physics.add.collider(this.player.player, this.spikes, this.player.hit, null, this.player);
    this.physics.add.collider(this.player.player, this.coins, this.collect, null, this);
    this.physics.add.collider(this.player.player, this.platforms);

    this.fpsMeter = new FpsMeterComponent(this);
  }

  update() {
    this.fpsMeter.update();

    this.player.update();
    const dx = Math.round(this.player.player.x);
    const dy = Math.round(this.player.player.y);
    this.cameras.main.pan(dx, dy - 100, 0);
    this.background.update(dx, dy);
    this.hud.update();
  }

  private collect(player, item) {
    item.destroy();
    this.platformerData.collected++;
  }

}
