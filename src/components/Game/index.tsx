import { AxiosError } from 'axios'
import React, { FC, useEffect, useCallback } from 'react'
import { EKeys } from '~types'
import { useGame, useWindowSize } from '~hooks'
import { getTileHeight } from '../../utils/getTileHeight'
import { Board } from '../Board'
import { MovingTiles } from '../MovingTiles'
import { Notification } from '../Notification'
import { Styled } from './styled'
import { HEADER_FOOTER_OFFSET } from '~constants'
import { MobileControls } from '../MobileControls'

type TGameProps = {
  radius: number
}

export const Game: FC<TGameProps> = ({ radius }) => {
  const {
    isLoading,
    isControlsBlocked,
    board,
    allTiles,
    activeTiles,
    handleMove,
    startGame,
    restartGame,
    status,
    gameOver,
    moves,
    score,
    error
  } = useGame(radius)
  const { width = 0, height = 0 } = useWindowSize()
  const tileHeight = getTileHeight(width, height - HEADER_FOOTER_OFFSET, radius)

  const handleControlClick = useCallback((key: EKeys) => {
    if (isLoading || isControlsBlocked) {
      return
    }

    handleMove(key)
  }, [isLoading, isControlsBlocked, handleMove])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const { code } = e
    const key = code as EKeys

    if (!Object.values(EKeys).includes(key)) {
      return
    }

    handleControlClick(key)
  }, [handleControlClick])

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)

    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    error && console.error(error)
  }, [error])

  useEffect(() => {
    startGame()
  }, [startGame])

  if (error) {
    return <Notification
      title="Error"
      message={(error instanceof AxiosError && error?.response?.data?.error) || error.message}
    />
  }

  return !isLoading ? (
    <>
      <Styled.GameWrapper>
        <Styled.Stats>
          Score: {score}
        </Styled.Stats>
        <Styled.BoardWrapper>
          {height && (
            <>
              <Board board={board} flatBoard={allTiles} tileHeight={tileHeight} />
              <MovingTiles tiles={activeTiles} radius={radius} tileHeight={tileHeight} />
            </>
          )}
        </Styled.BoardWrapper>
        <Styled.Stats data-status={status}>
          Moves: {moves} | Game status: {status}
        </Styled.Stats>
        <MobileControls onClick={handleControlClick} />
      </Styled.GameWrapper>
      {gameOver && (
        <Notification
          title="Game Over"
          message={`Score: ${score}`}
          disabled={isLoading}
          delay={1000}
          onContinue={restartGame}
        />
      )}
    </>
  ) : <Notification title="Loading..." />
}
