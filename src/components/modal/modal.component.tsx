import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
import Button from '../button/button.component'

interface Props {
  buttonText?: string
  text?: string
  onClickButton: () => void
  onClose: () => void
}

const Modal: FunctionComponent<Props> = ({ buttonText, onClickButton, onClose, text }): ReactElement => {
  return (
    <ModalWrapper>
      <ModalContent>
        <Close onClick={() => onClose()}>&times;</Close>
        {text !== undefined && (<p>{text}</p>)}
        <Button text={buttonText ?? 'Click here!'} onClick={() => onClickButton()} />
      </ModalContent>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 20%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled.div`
  min-height: 5em;
  background-color: white;
  margin: auto;
  padding: 1em;
  border: 1px solid #888;
  width: 80%;

  p {
    color: black;
  }
`

const Close = styled.div`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover, &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`

export default Modal
