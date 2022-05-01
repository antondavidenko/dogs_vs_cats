export class PlatformerHudComponent {

  private coinsText;
  private lifeText;
  private data;

  constructor(scene) {
    const camera = scene.cameras.add(0, 0, 640, 100);
    camera.setBackgroundColor('rgba(69, 69, 69, 0.5)');
    this.coinsText = scene.add.text(100, 20, '', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    scene.add.sprite(50, 50, 'tiles', 50).setScale(2, 2);
    this.data = scene.platformerData;
    scene.add.sprite(450, 50, 'tiles', 67).setScale(2, 2);
    this.lifeText = scene.add.text(500, 20, '', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
  }

  update() {
    this.coinsText.text = `${this.data.max}/${this.data.collected}`;
    this.lifeText.text = this.data.life;
  }

}
