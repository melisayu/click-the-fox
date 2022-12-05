import React, { FunctionComponent, ReactElement } from 'react'

interface Props {
  text: string
  onClick?: () => void
}

const Button: FunctionComponent<Props> = ({ onClick, text }): ReactElement => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
