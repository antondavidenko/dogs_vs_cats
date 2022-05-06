export class LevelAssetsModel {

  constructor(private levelId) { }

  get id(): string {
    return `level${this.levelId}`;
  }

  get asset(): string {
    return `assets/levels/level${this.levelId}.json`;
  }

}
