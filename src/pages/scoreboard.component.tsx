import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button/button.component'
import Table from '../components/table/table.component'

const ScoreBoard = (): ReactElement => {
  const navigate = useNavigate()

  const backToWelcomeScreen = (url: string): void => {
    localStorage.removeItem('player')
    navigate(url)
  }

  return (
    <div>
      <h2>This is the scoreboard</h2>
      <Table data={[]} />
      <Button text={'To Welcome Screen'} onClick={() => backToWelcomeScreen('/')} />
      <Button text={'PLAY!'} onClick={() => navigate('/game')} />
    </div>
  )
}

export default ScoreBoard
