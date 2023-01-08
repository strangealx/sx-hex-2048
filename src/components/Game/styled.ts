import styled from 'styled-components'

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  text-align: center;
  padding: 1em 0;
`

const BoardWrapper = styled.div`
  position: relative;
  max-width: 100%;
  overflow: hidden;
  margin: 1.5em auto;
  padding: 0;
`

const Stats = styled.div`
  font-size: 1.5em;
`

export const Styled = {
  GameWrapper,
  BoardWrapper,
  Stats,
}
