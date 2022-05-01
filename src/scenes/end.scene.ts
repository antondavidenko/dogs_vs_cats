import { Layout } from '@antondavidenko/layout-phaser3';
import { layoutConfig, ChoiceLayoutList } from '../model';
import { createButton } from '../utils';
import { ScenesList } from './scenes-list';

export class EndScene extends Phaser.Scene {

  private layout: Layout<ChoiceLayoutList>;

  constructor() {
    super(ScenesList.EndScene);
    this.layout = new Layout<ChoiceLayoutList>(layoutConfig, this, 'choice', 'en');
  }

  preload() {
    this.layout.preload();
  }

  async create() {
    await this.layout.create();

    this.layout.list.headerText.text = 'END';

    createButton(this.layout.list.button, () => {
      this.scene.start(ScenesList.ChoiceScene);
    });
  }

}
