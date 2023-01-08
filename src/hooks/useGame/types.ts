import { EGameStatus } from '~types'
import { TBoard, TTileWithCoords } from '~entities'

export type TGameState = {
  isLoading: boolean
  isControlsBlocked: boolean
  status: EGameStatus
  gameOver: boolean
  moves: number
  score: number
  board: TBoard
  activeTiles: TTileWithCoords[]
  allTiles: TTileWithCoords[]
  error?: Error
}

export enum EGameActionType {
  LOAD_INIT,
  LOAD_COMPLETE,
  LOCK,
  UNLOCK,
  ERROR,
  UPDATE, 
}

type TGameActionSimple = {
  type: Exclude<EGameActionType, EGameActionType.UPDATE | EGameActionType.ERROR>
}

type TGameActionUpdate = {
  type: EGameActionType.UPDATE
  payload: Partial<Omit<TGameState, 'isLoading' | 'isControlsBlocked' | 'error'>>
}

type TGameActionError = {
  type: EGameActionType.ERROR
  payload: Error
}

export type TGameAction = TGameActionSimple | TGameActionUpdate | TGameActionError
