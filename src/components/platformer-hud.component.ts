export class PlatformerHudComponent {

  private coinsText;
  private data;

  constructor(scene) {
    const camera = scene.cameras.add(0, 0, 640, 100);
    camera.setBackgroundColor('rgba(69, 69, 69, 0.5)');
    this.coinsText = scene.add.text(100, 20, '', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    scene.add.sprite(50, 50, 'tiles', 50).setScale(2, 2);
    this.data = scene.platformerData;
  }

  update() {
    this.coinsText.text = `${this.data.max}/${this.data.collected}`;
  }

}
