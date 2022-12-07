import React, { ReactElement, useContext, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button/button.component'
import { globalContext } from '../store/context'

const WelcomeScreen = (): ReactElement => {
  const navigate = useNavigate()

  // States.
  const { dispatch } = useContext(globalContext)
  const [playerName, setPlayerName] = useState('')

  const play = (player: string): void => {
    // Redirect to the game page with name of the player stored in global state.
    dispatch({ type: 'SET_PLAYER', payload: player })
    navigate('/game')
  }

  return (
    <ScoreboardWrapper>
      <Description>Click as many foxes as you can!</Description>
      <Description>Beware not to poke the cats because they will steal your points!</Description>
      <FormWrapper>
        <label htmlFor="name_input" >Enter your name : </label>
        <input
          id="name_input"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={event => event.key === 'Enter' && play(playerName)}
        />
        <Button onClick={() => play(playerName)} text={'PLAY!'} />
      </FormWrapper>
    </ScoreboardWrapper>
  )
}

const ScoreboardWrapper = styled.div`
  position: absolute;
  top: 25%;
  width: 100%;
`

const Description = styled.p`
 margin: .2em auto;
 font-size: 1em;
`

const FormWrapper = styled.div`
  background-color: #FFCAC8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  padding: 1em;
  margin: auto;
  margin-top: 2em;
  width: 30em;
  max-width: 85%;

  label {
    padding-bottom: 1em;
    font-weight: 800;
    font-size: 1.5em;
  }

  input {
    width: 80%;
    margin-bottom: 1em;
    font-size: 1.2em;
    padding: .5em;
  }
`

export default WelcomeScreen
