import { TCell, TCubeCoords, TOffsetCoords } from '~types'

export type TTile = {
  id: number
  value: number
}

export type TBoard<T = TTile | null> = Array<Array<T>>

export type TMoveFn = () => boolean
export type TMoveFnWithDirection = (direction: ERotateDirection) => ReturnType<TMoveFn>

export type TTileWithCoords = TTile & {
  offsetCoords: TOffsetCoords
  cubeCoords: TCubeCoords
  deleted?: boolean 
}

export type TGame = {
  board: TBoard
  moves: number
  score: number
  gameOver: boolean
  allTiles: TTileWithCoords[]
  activeTiles: TTileWithCoords[]
  deletedTiles: TTileWithCoords[]
  addTile(tile: TCell): void
  mergeTop: TMoveFn
  mergeBottom: TMoveFn
  mergeDiagonalTop: TMoveFnWithDirection
  mergeDiagonalBottom: TMoveFnWithDirection
}

export enum ERotateDirection {
  CLOCKWISE = 1,
  COUNTER_CLOCKWISE = -1
}

export enum EVerticalDirection {
  TOP = 1,
  BOTTOM = -1
}
