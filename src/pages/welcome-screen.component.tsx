import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button/button.component'

const WelcomeScreen = (): ReactElement => {
  const navigate = useNavigate()
  const [playerName, setPlayerName] = useState('')

  const play = (player: string): void => {
    // Redirect to the game page with name of the player stored in local storage.
    localStorage.setItem('player', player)
    navigate('/game')
  }

  console.log('plll', playerName)

  return (
    <div>
      <h1>Click the Fox! Game</h1>
      <label htmlFor="name_input" >Name : </label>
      <input
        id="name_input"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={event => event.key === 'Enter' && play(playerName)}
      />
      <Button onClick={() => play(playerName)} text={'PLAY!'} />
    </div>
  )
}

export default WelcomeScreen
