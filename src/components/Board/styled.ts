import styled from 'styled-components'
import { HEX_HEIGHT_TO_EDGE_RATIO } from '~constants'

const Col = styled.div`
  display: block;
`

const Board = styled.div<{ tileHeight: number }>`
  display: inline-flex;
  align-items: center;

  ${Col} {
    &:not(:last-child) {
      margin-right: -${({ tileHeight }) => tileHeight / 2 * HEX_HEIGHT_TO_EDGE_RATIO}px;
    }
  }
`

const TestBoard = styled.div`
  display: none;
`

export const Styled = {
  Board,
  Col,
  TestBoard
}
