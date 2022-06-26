import { LevelAssetsModel } from './level.model';
import { TilemapBuilder } from './tilemap-builder';

export class LevelComponent {

  private assetsModel: LevelAssetsModel;

  constructor(private scene: Phaser.Scene, private levelId: number) {
    this.assetsModel = new LevelAssetsModel(levelId);
  }

  preload() {
    const { id, asset, tilesId, tilesUrl } = this.assetsModel;
    this.scene.load.tilemapTiledJSON(id, asset);
    this.scene.load.spritesheet(tilesId, tilesUrl, { frameWidth: 128 });
  }

  create() {
    this.scene.physics.world.setFPS(300);
    const map = this.scene.make.tilemap({ key: this.assetsModel.id });
    const builder = new TilemapBuilder(map, this.assetsModel);
    const checkPoints = builder.createObjects('Respawn', 2);
    const respawnSprite = checkPoints.children.entries[0] as Phaser.GameObjects.Image;
    const finishGroup = builder.createObjects('Finish', 2);
    const base = builder.createTiles('Base');
    builder.createTiles('Decor');
    builder.createTiles('Decor2');
    builder.createTiles('Decor3');
    const spikes = builder.createObjects('Spikes', 2);
    const coins = builder.createObjects('Coins', 2);
    const platforms = builder.createObjects('Platforms', 2);
    builder.createText('Info');

    return {
      respawnPoint: new Phaser.Geom.Point(respawnSprite.x, respawnSprite.y),
      coinsCount: coins.children.entries.length,
      platforms,
      base,
      spikes,
      finishGroup,
      checkPoints,
      coins,
      heightInPixels: map.heightInPixels,
    };
  }

}
