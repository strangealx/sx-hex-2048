import { TCubeCoords } from './coords'

export type TCell = TCubeCoords & {
  value: number
}

export enum EKeys {
  NORTH_WEST = 'KeyQ',
  NORTH = 'KeyW',
  NORTH_EAST = 'KeyE',
  SOUTH_WEST = 'KeyA',
  SOUTH = 'KeyS',
  SOUTH_EAST = 'KeyD'
}

export enum EGameStatus {
  PLAYING = 'playing',
  GAME_OVER = 'game-over'
}
