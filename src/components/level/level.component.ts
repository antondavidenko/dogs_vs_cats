import { LevelAssetsModel } from './level.model';
import { createTilemapObjectsLayer, createPlatforms } from './tilemap.factories';

export class LevelComponent {

  private assetsModel: LevelAssetsModel;

  constructor(private scene: Phaser.Scene, levelId) {
    this.assetsModel = new LevelAssetsModel(levelId);
  }

  preload() {
    this.scene.load.tilemapTiledJSON(this.assetsModel.id, this.assetsModel.asset);
    const frame64 = { frameWidth: 64, frameHeight: 64 };
    this.scene.load.spritesheet('tiles', 'assets/images/platformer_tilesheet.png', frame64);
  }

  create() {
    this.scene.physics.world.setFPS(300);
    const map = this.scene.make.tilemap({ key: this.assetsModel.id });

    const respawnSprite = createTilemapObjectsLayer(map, this.scene, 'Respawn', 2).children.entries[0];
    respawnSprite.visible = false;

    const finishGroup = createTilemapObjectsLayer(map, this.scene, 'Finish', 2);
    finishGroup.children.entries[1].visible = false;

    const platforms = createPlatforms(map);
    const spikes = createTilemapObjectsLayer(map, this.scene, 'Spikes', 2);
    const coins = createTilemapObjectsLayer(map, this.scene, 'Coins', 2);
    createTilemapObjectsLayer(map, this.scene, 'Decor', 1);

    return {
      respawnPoint: respawnSprite,
      coinsCount: coins.children.entries.length,
      platforms,
      spikes,
      finishGroup,
      coins,
    };
  }

}
