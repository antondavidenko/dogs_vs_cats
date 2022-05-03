export enum CharacterStates {
  NORMAL = 'NORMAL',
  BLINK = 'BLINK',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

export const PLAYER_VELOCITY = {
  X: 250,
  Y: 400,
};

export class PlayerAssetsModel {

  constructor(private assetId) { }

  get atlasId(): string {
    return `player-${this.assetId}`;
  }

  getAnimationId(animation: string): string {
    return `${animation}-${this.assetId}`;
  }

}
