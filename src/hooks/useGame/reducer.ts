import { EGameStatus } from '~types'
import { EGameActionType, TGameAction, TGameState } from './types'

export const initialState: TGameState = {
  isLoading: true,
  isControlsBlocked: true,
  status: EGameStatus.PLAYING,
  gameOver: false,
  moves: 0,
  score: 0,
  board: [],
  activeTiles: [],
  allTiles: []
}

export const reducer = (state: TGameState, action: TGameAction) => {
  const { type } = action
  switch (type) {
    case EGameActionType.LOAD_INIT:
      return { ...state, isLoading: true }
    case EGameActionType.LOAD_COMPLETE:
      return { ...state, isLoading: false }
    case EGameActionType.LOCK:
      return { ...state, isControlsBlocked: true }
    case EGameActionType.UNLOCK:
      return { ...state, isControlsBlocked: false }
    case EGameActionType.ERROR: {
      const { payload } = action
      return { ...state, error: payload }
    }
    case EGameActionType.UPDATE: {
      const { payload } = action
      return { ...state, ...payload }
    }
  }
}