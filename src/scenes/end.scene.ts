import { Layout } from '@antondavidenko/layout-phaser3';
import { layoutConfig, EndLayoutList } from '../model';
import { createButton } from '../utils';
import { ScenesList } from './scenes-list';

export class EndScene extends Phaser.Scene {

  private layout: Layout<EndLayoutList>;
  private win: boolean;

  constructor() {
    super(ScenesList.EndScene);
    this.layout = new Layout<EndLayoutList>(layoutConfig, this, 'end', 'en');
  }

  init(data) {
    this.win = data.win;
  }

  preload() {
    this.layout.preload();
  }

  async create() {
    await this.layout.create();

    this.layout.list.infoText.text = this.win ? 'WIN' : 'LOSE';

    createButton(this.layout.list.button, () => {
      this.scene.start(ScenesList.ChoiceScene);
    });
  }

}
