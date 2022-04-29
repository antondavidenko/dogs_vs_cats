export class FpsMeterComponent {

  private debugText: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene) {
    const textStyle = { font: '16px Courier', fill: '#00ff00' };
    this.debugText = scene.add.text(10, 10, 'Press 1 for DOG or 2 for CAT', textStyle);
  }

  update() {
    this.debugText.text = this.scene.game.loop.actualFps.toString();
  }

}
