import { Layout } from '@antondavidenko/layout-phaser3';
import { layoutConfig } from '../model/layouts/layout-config';
import { ChoiceLayoutList } from '../model/layouts/choice-layout.typing';
import { createButton } from '../utils/ui.factories';

const CHARACTER = {
  DOG: 'dog',
  CAT: 'cat',
};

export class ChoiceScene extends Phaser.Scene {

  private layout: Layout<ChoiceLayoutList>;
  private character = CHARACTER.DOG;

  constructor() {
    super('ChoiceScene');
    this.layout = new Layout<ChoiceLayoutList>(layoutConfig, this, 'choice', 'en');
  }

  preload() {
    this.layout.preload();
  }

  async create() {
    await this.layout.create();

    createButton(this.layout.list.button, () => {
      this.scene.start('PlatformerScene', { character: this.character });
    });

    createButton(this.layout.list.backgroundCat, () => {
      this.layout.list.avatarSelection.x = this.layout.list.avatarCat.x - 21;
      this.character = CHARACTER.CAT;
    });

    createButton(this.layout.list.backgroundDog, () => {
      this.layout.list.avatarSelection.x = this.layout.list.avatarDog.x - 21;
      this.character = CHARACTER.DOG;
    });
  }

}
