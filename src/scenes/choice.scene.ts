import { Layout } from '@antondavidenko/layout-phaser3';
import { layoutConfig, ChoiceLayoutList } from '../model';
import { createButton } from '../utils';
import { ScenesList } from './scenes-list';

export enum CharacterTypes {
  DOG = 'dog',
  CAT = 'cat',
}

export class ChoiceScene extends Phaser.Scene {

  private layout: Layout<ChoiceLayoutList>;
  private character: CharacterTypes = CharacterTypes.DOG;

  constructor() {
    super(ScenesList.ChoiceScene);
    this.layout = new Layout<ChoiceLayoutList>(layoutConfig, this, 'choice', 'en');
  }

  preload() {
    this.layout.preload();
  }

  async create() {
    await this.layout.create();

    createButton(this.layout.list.button, () => {
      this.scene.start(ScenesList.PlatformerScene, { character: this.character });
    });

    createButton(this.layout.list.backgroundCat, () => {
      this.layout.list.avatarSelection.x = this.layout.list.avatarCat.x - 21;
      this.character = CharacterTypes.CAT;
    });

    createButton(this.layout.list.backgroundDog, () => {
      this.layout.list.avatarSelection.x = this.layout.list.avatarDog.x - 21;
      this.character = CharacterTypes.DOG;
    });
  }

}
