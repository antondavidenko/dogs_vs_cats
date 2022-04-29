export function createPlatforms(map) {
  const tileset = map.addTilesetImage('simple_platformer', 'tiles');
  const platforms = map.createLayer('Platforms', tileset, 0, 2000);
  platforms.setCollisionByExclusion(-1, true);
  return platforms;
}

export function createTilemapObjectsLayer(map, scene, type, depth) {
  const objectsGroup = scene.physics.add.group({ allowGravity: false, immovable: true });
  map.getObjectLayer(type).objects.forEach((currentObject) => {
    const { x } = currentObject;
    const y = currentObject.y + 2000 - currentObject.height;
    const tileId = currentObject.gid - 1;
    const object = objectsGroup.create(x, y, 'tiles', tileId).setOrigin(0, 0);
    object.body.setSize(object.width, object.height - 20).setOffset(0, 20);
    object.setDepth(depth);
  });
  return objectsGroup;
}
