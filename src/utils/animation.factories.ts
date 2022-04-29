const ANIMATIONS_FRAME_RATE = 10;

export function createOneFrameAnimation(scene, key, frame) {
  scene.anims.create({
    key,
    frames: [{ key: 'player', frame }],
    frameRate: ANIMATIONS_FRAME_RATE,
  });
}

export function createMultiFramesAnimation(scene, key, start, end) {
  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNames('player', { start, end }),
    frameRate: ANIMATIONS_FRAME_RATE,
    repeat: -1,
  });
}
