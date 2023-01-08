import React, { FC, useState, useEffect } from 'react'
import { INCREMENT_ANIMATION_DURATION, MOVEMEMT_ANIMATION_DURATION } from '~constants'
import { Styled } from './styled'

type TTileProps = {
  height: number
  value?: number
  deleted?: boolean
}

export const Tile: FC<TTileProps> = ({
  height,
  value = 0,
  deleted = false
}) => {
  const [number, setNumber] = useState(value)
  const [isVisible, setIsVisible] = useState(!value)
  const edgeHeight = height / 2

  useEffect(() => {
    if (!value) {
      return
    }

    const timestamp = Date.now()
    const change = value / 2
    let interval: ReturnType<typeof setInterval>
    let timeout: ReturnType<typeof setTimeout>

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setNumber((current) => {
          if (current < value || current < 0) {
            const progress = Date.now() - timestamp
            const ratio = progress / INCREMENT_ANIMATION_DURATION - 1
            const output = Math.ceil((change * -1) * (ratio ** (value.toString().length) - 1) + change)
            return Math.min(value, output)
          }
  
          clearInterval(interval)
          return value
        })
      }, 10)
    }, MOVEMEMT_ANIMATION_DURATION)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
      setNumber(value)
    }
  }, [value])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Styled.TileBox
      isVisible={isVisible}
      $value={value}
      deleted={deleted}
    >
      <Styled.Left $height={edgeHeight} />
      <Styled.Middle $height={height} />
      <Styled.Right $height={edgeHeight} />
      <Styled.Value $height={height}>{!!number && number}</Styled.Value>
    </Styled.TileBox>
  )
}
