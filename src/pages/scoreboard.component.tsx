import React, { ReactElement, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button/button.component'
import Table from '../components/table/table.component'
import { globalContext } from '../store/context'
import { Score } from '../types/score.type'

const ScoreBoard = (): ReactElement => {
  const navigate = useNavigate()

  // States.
  const { globalState } = useContext(globalContext)

  // Get scores data and sort them based on highest scores.
  const getSortedData = (): Score[] => {
    return globalState.scores.sort((a, b) => {
      if (a.score < b.score) {
        return 1
      } else if (b.score < a.score) {
        return -1
      } else {
        return 0
      }
    })
  }

  const backToWelcomeScreen = (url: string): void => {
    localStorage.removeItem('player')
    navigate(url)
  }

  return (
    <div>
      <Table data={getSortedData()} />
      <Button text={'TO WELCOME SCREEN'} onClick={() => backToWelcomeScreen('/')} />
      <Button text={'PLAY AGAIN'} onClick={() => navigate('/game')} />
    </div>
  )
}

export default ScoreBoard
