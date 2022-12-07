import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAllImages } from '../apis'
import PreloadedImage from '../components/image/preloaded-image.component'
import Modal from '../components/modal/modal.component'
import LoadingSpinner from '../components/spinner/loading-spinner'
import * as ENDPOINTS from '../constants/endpoints'
import { globalContext } from '../store/context'
import { Answer } from '../types/answer.type'

// Time configuration in seconds.
const TIME = 30

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
      // Fetch images when rendering the page.
      const requestsURLs: string[] = [ENDPOINTS.CAT_URL, ENDPOINTS.FOX_URL]
      getAllImages(requestsURLs, dispatch).catch((error) => console.log(error))
    }
  }, [dispatch])

  const onSelectImage = (isCorrectAnswer: boolean): void => {
    setAnswers({
      right: isCorrectAnswer ? answers.right + 1 : answers.right,
      wrong: isCorrectAnswer ? answers.wrong : answers.wrong + 1
    })
  }

  const finishGame = (): void => {
    dispatch({ type: 'SET_SCORES', payload: score })
    setIsModalOpen(false)
    navigate('/scoreboard')
  }

  // Rerun effect when we update the count.
  useEffect(() => {
    // End game when the time is up.
    if (count === 0) {
      setIsModalOpen(true)
      return
    }

    // Score formula -> Score = SUM(fox click) – SUM(cat click)
    const countScore = (): void => {
      setScore(answers.right > answers.wrong ? answers.right - answers.wrong : 0)
    }

    // Start counting.
    if (count > 0) {
      // Save interval to clear it when component rerenders.
      const interval = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
        countScore()
      }
    }
  }, [count, answers.right, answers.wrong])

  // Shuffle images after submitting answer.
  useEffect(() => {
    const shuffleImages = (): void => {
      globalState.images.sort((a, b) => 0.5 - Math.random())
    }

    // Shuffle images after one of the images  is clicked.
    if (answers.right !== 0 || answers.wrong !== 0) {
      shuffleImages()
    }
  }, [answers, globalState.images])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isModalOpen && (
        <Modal
          onClose={() => finishGame()}
          onClickButton={() => finishGame()}
          buttonText={'Score Board'}
          text={`Your score is: ${score}`}
        />
      )}
      <InfoWrapper>
        <span>Score: {score}</span>
        <span>Time left: {count}</span>
      </InfoWrapper>
      <GameTiles>
        {globalState?.images?.map((image, index) => (
          <div onClick={() => onSelectImage(image.isCorrectAnswer)} key={index}>
            <PreloadedImage
              alt="animal+images"
              src={image.imageUrl}
              id={image.key}
            />
          </div>
        ))}
      </GameTiles>
    </Suspense>
  )
}

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-weight: 700;
  padding: 1em 0;
  font-size: 1.25em;
`

const GameTiles = styled.div`
  display: grid;
  grid-template-rows: 30% 30% 30%;
  grid-template-columns: 30% 30% 30%;
  grid-gap: 5px;
  justify-content: center;
  height: 100%;
  max-width: 90vh;
  margin: auto;

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
