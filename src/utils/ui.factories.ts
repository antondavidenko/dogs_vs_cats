export function createButton(object, callback: () => void): void {
  object.setInteractive({ cursor: 'pointer' }).on('pointerdown', callback);
}
