import { NUMBER_OF_PICTURES } from '../pages/game.component'
import { ActionType, IGlobalState } from '../types/store.type'
import { idGenerator } from '../utils'
import { initialState } from './context'

const NUMBER_OF_CATS = 8

const Reducer = (state: IGlobalState, action: ActionType): any => {
  switch (action.type) {
    case 'SET_SCORES':
      return {
        ...state,
        scores: action.payload
      }
    case 'SET_PLAYER_SCORE':
      return {
        ...state,
        score: action.payload
      }
    case 'SET_IMAGES': {
      const catImages = action.payload.cat?.slice(0, NUMBER_OF_CATS).map((image: { url: string }) => ({
        key: idGenerator(),
        imageUrl: image.url,
        isCorrectAnswer: false
      }))
      const foxImage = {
        key: idGenerator(),
        imageUrl: action.payload.fox?.image,
        isCorrectAnswer: true
      }
      return {
        ...state,
        images: [...state.images, ...catImages, foxImage]
      }
    }
    case 'PURGE_STATE':
      return initialState
    default:
      return state
  }
}

export default Reducer
