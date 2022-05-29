export class LevelAssetsModel {

  constructor(private levelId) { }

  get id(): string {
    return `level${this.levelId}`;
  }

  get asset(): string {
    return `assets/levels/level${this.levelId}.json`;
  }

  get tilesId(): string {
    return `level${this.levelId}tilesheet`;
  }

  get tilesUrl(): string {
    return `assets/images/${this.tilesId}.png`;
  }

}
