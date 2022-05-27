import { Layout } from '@antondavidenko/layout-phaser3';
import { layoutConfig, ChoiceLayoutList } from '../model';
import { createButton } from '../utils';
import { ScenesList } from './scenes-list';

export enum CharacterTypes {
  DOG = 'dog',
  CAT = 'cat',
}

const levelMap = [
  CharacterTypes.DOG,
  CharacterTypes.DOG,
  CharacterTypes.DOG,
  CharacterTypes.CAT,
  CharacterTypes.CAT,
  CharacterTypes.CAT,
];

export class ChoiceScene extends Phaser.Scene {

  private layout: Layout<ChoiceLayoutList>;

  constructor() {
    super(ScenesList.ChoiceScene);
    this.layout = new Layout<ChoiceLayoutList>(layoutConfig, this, 'choice', 'en');
  }

  preload() {
    this.layout.preload();
    this.load.image('bgAvatar', 'assets/layouts/choice/bgAvatar.png');
    this.load.image('avatarCat', 'assets/layouts/choice/avatarCat.png');
    this.load.image('avatarDog', 'assets/layouts/choice/avatarDog.png');
  }

  async create() {
    await this.layout.create();
    for (let i = 1; i <= 6; i++) {
      createButton(this.layout.list[`level${i}Point`], () => {
        // todo: use it when all levels and charackters will be ready
        // this.scene.start(ScenesList.PlatformerScene, { character: levelMap[i - 1], level: i });
        this.scene.start(ScenesList.PlatformerScene, { character: CharacterTypes.DOG, level: 3 });
      });
    }
    this.addMarker(this.layout.list.level1Point, CharacterTypes.DOG);
    this.addMarker(this.layout.list.level6Point, CharacterTypes.CAT);
  }

  addMarker(point: Phaser.GameObjects.Image, type: CharacterTypes): void {
    this.add.image(point.x + 42, point.y - 40, 'bgAvatar');
    if (type === CharacterTypes.DOG) {
      this.add.image(point.x + 42, point.y - 50, 'avatarDog');
    } else {
      this.add.image(point.x + 40, point.y - 53, 'avatarCat');
    }
  }

}
