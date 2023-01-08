import styled from 'styled-components'
import { HEX_HEIGHT_TO_EDGE_RATIO, MOVEMEMT_ANIMATION_DURATION, TILE_OFFSET } from '~constants'

type TTileBox = {
  $width: number
  $height: number
  $col: number
  $row: number
  $radius: number
  deleted?: boolean
}

const TileBox = styled.div<TTileBox>`
  position: absolute;
  top: 0;
  left: 0;
  ${({$width, $height,  $col, $row, $radius }) => {
    const colFromStart = $col + ($radius - 1)
    const rowFromStart = $row + ($radius - 1)
    const offset = $height / 2 * HEX_HEIGHT_TO_EDGE_RATIO
    const left = colFromStart * ($width + TILE_OFFSET) - (offset * colFromStart)
    const top = rowFromStart * ($height + TILE_OFFSET) + ($col % 2 !== 0 ? $height / 2 : 0)
  
    return `transform: translate(${Math.round(left)}px, ${Math.round(top)}px);`
  }}
  transition: transform ${MOVEMEMT_ANIMATION_DURATION}ms;
  z-index: ${({ deleted }) => deleted ? 1 : 2};
`

export const Styled = {
  TileBox
}