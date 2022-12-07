import React, { FunctionComponent, ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingSpinner: FunctionComponent = (): ReactElement => {
  return (
    <Loader>
      <Spinner />
    </Loader>
  )
}

const Loader = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`

const spinnerAnimation = keyframes`
  from { opacity: 1; transform: rotate(0deg); }
  to { opacity: 1; transform: rotate(359deg); }
`

const Spinner = styled.div`
  height: 5vh;
  width: 5vh;
  border: 6px solid rgba(0, 174, 239, 0.2);
  border-top-color: rgba(0, 174, 239, 0.8);
  border-radius: 100%;
  animation: ${spinnerAnimation} 0.6s infinite linear 0.25s;
  opacity: 0;
`

export default LoadingSpinner
