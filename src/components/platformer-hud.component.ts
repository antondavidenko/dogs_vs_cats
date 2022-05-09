import { Layout } from '@antondavidenko/layout-phaser3';
import { HudLayoutList, layoutConfig } from '../model';

export class PlatformerHudComponent {

  private data;
  private layout: Layout<HudLayoutList>;

  constructor(private scene) {
    this.layout = new Layout<HudLayoutList>(layoutConfig, this.scene, 'hud', 'en');
  }

  preload(): void {
    this.layout.preload();
  }

  async create() {
    await this.layout.create();
    this.scene.cameras.add(0, 0, 640, 100);
    this.data = this.scene.platformerData;
    return new Promise((resolve) => resolve(true));
  }

  update(): void {
    if (this.data) {
      this.layout.list.coinsText.text = `${this.data.max}/${this.data.collected}`;
      this.layout.list.lifeText.text = this.data.life;
    }
  }

}
