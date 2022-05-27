export class BackgroundComponent {

  private backgroundImage: Phaser.GameObjects.Image;

  constructor(private scene: Phaser.Scene) { }

  preload(): void {
    this.scene.load.image('background', 'assets/images/level1bg.jpg');
  }

  create(): void {
    this.backgroundImage = this.scene.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.01, 1.01);
  }

  update(dx: number, dy: number): void {
    const x = dx - this.backgroundImage.width / 2;
    const y = dy - this.backgroundImage.height / 2;
    this.backgroundImage.setPosition(x, y);
  }

}
