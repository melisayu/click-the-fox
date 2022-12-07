import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  onClick?: () => void
}

const Button: FunctionComponent<Props> = ({ onClick, text }): ReactElement => {
  return (
    <StyledButton onClick={onClick}>
      {text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  padding: .5em 2em;
  background-color: #FF9E9E;
  border-color: transparent;
  border-radius: 10px;
  min-width: 10em;
  cursor: pointer;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
  margin: .5em;
`

export default Button
