export enum CharacterStates {
  NORMAL = 'NORMAL',
  BLINK = 'BLINK',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

export const PLAYER_VELOCITY = {
  X: 400,
  Y: 600,
};

export class PlayerAssetsModel {

  constructor(private assetId) { }

  get atlasId(): string {
    return `player-${this.assetId}`;
  }

  get atlasUrl(): string {
    return `assets/images/player_${this.assetId}.png`;
  }

  getAnimationId(animation: string): string {
    return `${animation}-${this.assetId}`;
  }

}
