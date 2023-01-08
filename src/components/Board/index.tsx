import React, { FC } from 'react'
import { TBoard, TTileWithCoords } from '~entities'
import { Tile } from '../Tile'
import { Styled } from './styled'

type TBoardProps = {
  board: TBoard,
  flatBoard: TTileWithCoords[],
  tileHeight: number
}

export const Board: FC<TBoardProps> = ({ board, flatBoard, tileHeight }) => (
  <>
    <Styled.Board tileHeight={tileHeight}>
      {board.map((row, i) => (
        <Styled.Col key={i}>
          {row.map((_, i) => (
            <div key={`tile-${i}`}>
              <Tile height={tileHeight} />
            </div>
          ))}
        </Styled.Col>
      ))}
    </Styled.Board>
    {/* TODO: For test purposes only, should not be included in production */}
    <Styled.TestBoard>
      {flatBoard.map(({ cubeCoords: { x, y, z }, value, id }) => (
        <div
          key={`test-${x}-${y}-${z}`}
          data-x={x}
          data-y={y}
          data-z={z}
          data-value={value}
        />
      ))}
    </Styled.TestBoard>
  </>
)
