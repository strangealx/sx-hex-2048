import styled, { keyframes } from 'styled-components'
import {
  BLINK_ANIMATION_DURATION,
  COLORS,
  HEX_HEIGHT_TO_EDGE_RATIO,
  MOVEMEMT_ANIMATION_DURATION,
  TILE_HEIGHT_TO_FONT_SIZE_RATIO,
  TILE_OFFSET
} from '~constants'
import { getColor } from '../../utils/getColor'

type TTileSize = {
  $height: number
}

const blink = keyframes`
  0% {
    opacity: 0;
  }

  33% {
    opacity: 1;
  }

  66% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`

const Left = styled.div<TTileSize>`
  border-right: ${({ $height }) => $height  * HEX_HEIGHT_TO_EDGE_RATIO}px solid transparent;
  border-top: ${({ $height }) => $height}px solid transparent;
  border-bottom: ${({ $height }) => $height}px solid transparent;
  transition: border-right-color ${MOVEMEMT_ANIMATION_DURATION};
`

const Middle = styled.div<TTileSize>`
  float: left;
  width: ${({ $height }) => $height * HEX_HEIGHT_TO_EDGE_RATIO}px;
  height: ${({ $height }) => $height}px;
  background-color: transparent;
  transition: background-color ${MOVEMEMT_ANIMATION_DURATION};
`

const Right = styled.div<TTileSize>`
  border-left: ${({ $height }) => $height  * HEX_HEIGHT_TO_EDGE_RATIO}px solid transparent;
  border-top: ${({ $height }) => $height}px solid transparent;
  border-bottom: ${({ $height }) => $height}px solid transparent;
  transition: border-left-color ${MOVEMEMT_ANIMATION_DURATION};
`

const Value = styled.span<{ $height: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #fff;
  text-align: center;
  line-height: ${({ $height }) => $height}px;
  font-size: ${({ $height }) => Math.ceil($height / TILE_HEIGHT_TO_FONT_SIZE_RATIO)}px;
  white-space: nowrap;
  font-weight: 100;
  letter-spacing: 1px;
`

type TTileBox = {
  isVisible: boolean
  $value: number
  deleted: boolean
}

const TileBox = styled.div<TTileBox>`
  position: relative;
  display: flex;
  padding: ${TILE_OFFSET / 2}px;
  opacity: ${({ isVisible, deleted }) => (isVisible && !deleted ? 1 : 0)};
  animation: ${blink} ${({ $value }) => (!!$value ? `${BLINK_ANIMATION_DURATION}ms` : '0s')};
  transition: opacity 0.3s ${({ deleted }) => deleted ? `${MOVEMEMT_ANIMATION_DURATION}ms` : '0s'};

  ${Right} {
    border-left-color: ${({ $value }) => getColor($value, COLORS)};
  }

  ${Left} {
    border-right-color: ${({ $value }) => getColor($value, COLORS)};
  }

  ${Middle} {
    background-color: ${({ $value }) => getColor($value, COLORS)};
  }
`

export const Styled = {
  TileBox,
  Left,
  Middle,
  Right,
  Value
}
