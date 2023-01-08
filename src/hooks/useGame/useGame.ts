import { AxiosError } from 'axios'
import { useCallback, useRef, useReducer } from 'react'
import { createGame, submitMove } from '~api'
import { MOVEMEMT_ANIMATION_DURATION, NEW_TILE_ANIMATION_DELAY } from '~constants'
import { ERotateDirection, Game, TGame } from '~entities'
import { EGameStatus, EKeys } from '~types'
import { initialState, reducer } from './reducer'
import { EGameActionType, TGameState } from './types'

type TUseGame = (radius: number) => TGameState & {
  handleMove: (direction: EKeys) => Promise<void>
  startGame: () => Promise<void>
  restartGame: () => void
}

export const useGame: TUseGame = (radius) => {
  const gameRef = useRef<TGame>(new Game(radius))
  const [state, dispatch] = useReducer(reducer, initialState)

  const game = gameRef.current

  const sortTiles = useCallback(() => (
    [
      ...game.activeTiles,
      ...game.deletedTiles
    ]
      .sort(({ id: aId }, { id: bId }) => aId - bId)
  ), [game])

  const merge = useCallback((direction: EKeys) => {
    switch (direction) {
      case EKeys.NORTH:
        return game.mergeTop()
      case EKeys.NORTH_EAST:
        return game.mergeDiagonalTop(ERotateDirection.CLOCKWISE)
      case EKeys.NORTH_WEST:
        return game.mergeDiagonalTop(ERotateDirection.COUNTER_CLOCKWISE)
      case EKeys.SOUTH:
        return game.mergeBottom()
      case EKeys.SOUTH_WEST:
        return game.mergeDiagonalBottom(ERotateDirection.CLOCKWISE)
      case EKeys.SOUTH_EAST:
        return game.mergeDiagonalBottom(ERotateDirection.COUNTER_CLOCKWISE)
      default:
        return false
    }
  }, [game]) 

  const startGame = useCallback(async () => {
    dispatch({ type: EGameActionType.LOAD_INIT })
    dispatch({ type: EGameActionType.LOCK })

    try {
      const initialPosition = await createGame()

      initialPosition.forEach((tile) => game.addTile(tile))
      const { gameOver, score, moves, board, allTiles } = game

      dispatch({ type: EGameActionType.UPDATE, payload: {
        board,
        allTiles,
        gameOver,
        score,
        moves,
        status: gameOver ? EGameStatus.GAME_OVER : EGameStatus.PLAYING,
        activeTiles: sortTiles(),
      }})
      dispatch({ type: EGameActionType.UNLOCK })
    } catch (e) {
      dispatch({ type: EGameActionType.ERROR, payload: e as AxiosError })
    } finally {
      dispatch({ type: EGameActionType.LOAD_COMPLETE })
    }
  }, [game, sortTiles])

  const makeMove = async (direction: EKeys) => {
    dispatch({ type: EGameActionType.LOCK })

    if (!merge(direction)) {
      dispatch({ type: EGameActionType.UNLOCK })
      return
    }

    try {
      const request = game.activeTiles.map(({ value, cubeCoords: { x, y, z } }) => ({ value, x, y, z }))
      const nextTiles = await submitMove(request)
      const { score, moves } = game

      dispatch({ type: EGameActionType.UPDATE, payload: {
        score,
        moves,
        activeTiles: sortTiles(),
      }})

      setTimeout(() => {
        nextTiles.forEach((tile) => game.addTile(tile))
        const { gameOver, allTiles } = game

        dispatch({ type: EGameActionType.UPDATE, payload: {
          allTiles,
          gameOver,
          status: gameOver ? EGameStatus.GAME_OVER : EGameStatus.PLAYING,
          activeTiles: sortTiles(),
        }})
        dispatch({ type: EGameActionType.UNLOCK })
      }, MOVEMEMT_ANIMATION_DURATION + NEW_TILE_ANIMATION_DELAY)
    } catch (e) {
      dispatch({ type: EGameActionType.ERROR, payload: e as AxiosError })
    }
  }

  const restartGame = () => {
    gameRef.current = new Game(radius)
    dispatch({ type: EGameActionType.LOAD_INIT })
  }

  return {
    ...state,
    handleMove: makeMove,
    startGame,
    restartGame,
  }
}
