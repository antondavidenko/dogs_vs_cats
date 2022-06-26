import { LevelAssetsModel } from './level.model';

const l10nId = 'en';

type TiledObject = Phaser.Types.Tilemaps.TiledObject;
type ArcadeGroup = Phaser.Physics.Arcade.Group;

export class TilemapBuilder {

  constructor(private map: Phaser.Tilemaps.Tilemap, private assetsModel: LevelAssetsModel) {}

  createTiles(layerId: string) {
    let platforms;
    if (this.map.layers.find((layer) => layer.name === layerId)) {
      const tileset = this.map.addTilesetImage(this.assetsModel.tilesId, this.assetsModel.tilesId);
      platforms = this.map.createLayer(layerId, tileset, 0, 2000);
      platforms.setCollisionByExclusion([-1], true);
    }
    return platforms;
  }

  createObjects(layerId: string, depth: number) {
    const objectsGroup = this.map.scene.physics.add.group({ allowGravity: false, immovable: true });
    this.map.getObjectLayer(layerId).objects.forEach((currentObject) => {
      let creator = new Map([
        [2, this.createInvisible],
        [3, this.createFinish],
        [4, this.createInvisible],
        [5, this.createPlatform],
        [6, this.createCoin],
      ]).get(currentObject.gid);
      creator = creator || this.createRegular;
      const object = creator.call(this, currentObject, objectsGroup);
      object.setDepth(depth);
    });
    return objectsGroup;
  }

  createText(layerId: string): void {
    this.map.getObjectLayer(layerId).objects.forEach((currentObject) => {
      const x = currentObject.x - 85;
      const y = currentObject.y + 2000 - currentObject.height;
      const { text, size } = this.getTextAndSize(currentObject.text.text);
      const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
        fontSize: `${size}px`,
        fontFamily: 'gamefont',
        color: '#666666',
        align: 'center',
      };
      this.map.scene.add.text(x, y, text, textStyle);
    });
  }

  private getTextAndSize(id: string): { text: string, size: string } {
    const l10nList = this.map.scene.cache.json.get(l10nId) as Array<any>;
    const { text, size } = l10nList.find((element) => element.id === id);
    return { text, size };
  }

  private createPlatform(currentObject: TiledObject, objectsGroup: ArcadeGroup) {
    const { x, y, key, frame } = this.getCreateData(currentObject);
    const object = objectsGroup.create(x, y, key, frame).setOrigin(0, 0);
    object.body.setSize(object.width, object.height - object.height / 2).setOffset(0, 0);
    return object;
  }

  private createRegular(currentObject: TiledObject, objectsGroup: ArcadeGroup) {
    const { x, y, key, frame } = this.getCreateData(currentObject);
    const object = objectsGroup.create(x, y, key, frame).setOrigin(0, 0);
    object.body.setSize(object.width, object.height - object.height);
    return object;
  }

  private createCoin(currentObject: TiledObject, objectsGroup: ArcadeGroup) {
    const { x, y, key, frame } = this.getCreateData(currentObject);
    const object = objectsGroup.create(x, y + 50, key, frame).setOrigin(0, 0);
    object.body.setSize(object.width, object.height - object.height);
    return object;
  }

  private createFinish(currentObject: TiledObject, objectsGroup: ArcadeGroup) {
    const { x, y, key, frame } = this.getCreateData(currentObject);
    const object = objectsGroup.create(x, y, key, frame).setOrigin(0, 0);
    object.body.setSize(object.width, object.height * 20);
    return object;
  }

  private createInvisible(currentObject: TiledObject, objectsGroup: ArcadeGroup) {
    const { x, y, key, frame } = this.getCreateData(currentObject);
    const object = objectsGroup.create(x, y, key, frame).setOrigin(0, 0).setVisible(false);
    object.body.setSize(object.width, object.height * 20);
    return object;
  }

  private getCreateData(currentObject: TiledObject) {
    const y = currentObject.y + 2000 - currentObject.height;
    return { x: currentObject.x, y, key: this.assetsModel.tilesId, frame: currentObject.gid - 1 };
  }

}
