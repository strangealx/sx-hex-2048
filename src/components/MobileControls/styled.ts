import styled from "styled-components";

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  max-width: 300px;
  margin: 2em auto 0 auto;
  border: 2px solid #000;
  border-radius: 3px;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`

const Button = styled.button`
  display: block;
  flex: 1 1 30%;
  padding: 0.125em 0.5em;
  margin: 0;
  outline: none;
  background-color: transparent;
  border: unset;
  border-radius: 0;
  font-size: 1.75em;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;

  &:nth-child(3n + 2) {
    border-left: 2px solid #000;
    border-right: 2px solid #000;
  }

  &:nth-child(n + 4) {
    border-top: 2px solid #000;
  }
`

export const Styled = {
  Controls,
  Button
}
