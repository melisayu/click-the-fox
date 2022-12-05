import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAllImages } from '../apis'
import Button from '../components/button/button.component'
import Modal from '../components/modal/modal.component'
import * as ENDPOINTS from '../constants/endpoints'
import { globalContext } from '../store/context'
import { Answer } from '../types/answer.type'

// Time configuration in seconds.
const TIME = 30
export const NUMBER_OF_PICTURES = 9

const Game = (): ReactElement => {
  const navigate = useNavigate()

  // States.
  const { globalState, dispatch } = useContext(globalContext)
  const [score, setScore] = useState<number>(globalState.score)
  const [count, setCount] = useState<number>(TIME)
  const [answers, setAnswers] = useState<Answer>({ right: 0, wrong: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('globalState') === null) {
      console.log('how many times??111')
      // Fetch images when rendering the page.
      const requestsURLs: string[] = [ENDPOINTS.CAT_URL, ENDPOINTS.FOX_URL]
      getAllImages(requestsURLs, dispatch).catch((error) => console.log(error))
    }
  }, [])

  // Rerun effect when we update the count.
  useEffect(() => {
    // Exit when the time is up.
    if (count === 0) {
      setIsModalOpen(true)
      return
    }

    // Save interval to clear it when component rerenders.
    const interval = setInterval(() => {
      setCount(count - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
      countScore()
    }
  }, [count])

  useEffect(() => {
    // Shuffle images after one of the images  is clicked.
    if (answers.right !== 0 || answers.wrong !== 0) {
      shuffleImages()
    }
  }, [answers])

  const shuffleImages = (): void => {
    globalState.images.sort((a, b) => 0.5 - Math.random())
  }

  const countScore = (): void => {
    setScore(answers.right > answers.wrong ? answers.right - answers.wrong : 0)
  }

  const onSelectImage = (isCorrectAnswer: boolean): void => {
    setAnswers({
      right: isCorrectAnswer ? answers.right + 1 : answers.right,
      wrong: isCorrectAnswer ? answers.wrong : answers.wrong + 1
    })
  }

  const finishGame = (): void => {
    setIsModalOpen(false)
    navigate('/scoreboard')
  }

  return (
    <div>
      {isModalOpen && (
        <Modal
          onClose={() => finishGame}
          onClickButton={() => navigate('/scoreboard')}
          buttonText={'Score Board'}
          text={`Your score is: ${score}`}
        />
      )}
      <h2>This is the game</h2>
      <span>Score: {score}</span>
      <span>Time left: {count}</span>
      <GameTiles>
        {globalState?.images?.map((image, index) => (
          <div onClick={() => onSelectImage(image.isCorrectAnswer)} key={index}>
            <img key={image.key} src={image.imageUrl} alt="animal_images" />
          </div>
        ))}
      </GameTiles>
    </div>
  )
}

const GameTiles = styled.div`
  display: grid;
  grid-template-rows: 200px 200px 200px;
  grid-template-columns: 200px 200px 200px;

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`

export default Game
