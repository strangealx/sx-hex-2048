import styled from 'styled-components'

type TNotification = {
  isVisible: boolean
  delay?: number
}

const Notification = styled.div<TNotification>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: opacity 300ms ${({ delay = 0 }) => delay}ms;
  background-color: #fff;
`

const Title = styled.div`
  font-size: 48px;
`

const Message = styled.div`
  font-size: 24px;
  margin-top: 0.5em;
`

const Button = styled.button`
  padding: 0.125em 0.5em;
  margin: 1em 0 0 0;
  outline: none;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 3px;
  font-size: 1.75em;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const Styled = {
  Notification,
  Title,
  Message,
  Button
}
