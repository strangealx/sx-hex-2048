import React, { FC } from 'react'
import { HEX_HEIGHT_TO_WIDTH_RATIO } from '~constants'
import { TTileWithCoords } from '~entities'
import { Tile } from '../Tile'
import { Styled } from './styled'

type TMovingTilesProps = {
  tiles: TTileWithCoords[]
  radius: number
  tileHeight: number
}

export const MovingTiles: FC<TMovingTilesProps> = ({ tiles, radius, tileHeight }) => (
  <>
    {tiles.map(({ offsetCoords: { col, row }, value, id, deleted }) => (
      <Styled.TileBox
        key={`moving-tile-${id}`}
        deleted={deleted}
        $height={tileHeight}
        $width={tileHeight / HEX_HEIGHT_TO_WIDTH_RATIO}
        $col={col}
        $row={row}
        $radius={radius}
      >
        <Tile height={tileHeight} value={value} deleted={deleted} />
      </Styled.TileBox>
    ))}
  </>
)
