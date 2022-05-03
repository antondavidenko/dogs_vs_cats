const ANIMATIONS_FRAME_RATE = 10;

export function createOneFrameAnimation(scene, key, frame, atlasId) {
  scene.anims.create({
    key,
    frames: [{ key: atlasId, frame }],
    frameRate: ANIMATIONS_FRAME_RATE,
  });
}

export function createMultiFramesAnimation(scene, key, start, end, atlasId) {
  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNames(atlasId, { start, end }),
    frameRate: ANIMATIONS_FRAME_RATE,
    repeat: -1,
  });
}
