import { LevelAssetsModel } from './level.model';
import { TilemapBuilder } from './tilemap-builder';

export class LevelComponent {

  private assetsModel: LevelAssetsModel;

  constructor(private scene: Phaser.Scene, private levelId: number) {
    this.assetsModel = new LevelAssetsModel(levelId);
  }

  preload() {
    this.scene.load.tilemapTiledJSON(this.assetsModel.id, this.assetsModel.asset);
    this.scene.load.spritesheet('tiles', `assets/images/level${this.levelId}tilesheet.png`, { frameWidth: 128 });
  }

  create() {
    this.scene.physics.world.setFPS(300);
    const map = this.scene.make.tilemap({ key: this.assetsModel.id });
    const builder = new TilemapBuilder(map, this.levelId);
    const checkPoints = builder.createObjects('Respawn', 2);
    const respawnSprite = checkPoints.children.entries[0] as Phaser.GameObjects.Image;
    const finishGroup = builder.createObjects('Finish', 2);
    const base = builder.createTiles('Base');
    builder.createTiles('Decor');
    builder.createTiles('Decor2');
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
    };
  }

}
