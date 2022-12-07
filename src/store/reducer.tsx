import { ActionType, IGlobalState } from '../types/store.type'
import { generateId, getDate } from '../utils'
import { initialState } from './context'

const NUMBER_OF_CATS = 8

const Reducer = (state: IGlobalState, action: ActionType): any => {
  switch (action.type) {
    case 'SET_SCORES':
      return {
        ...state,
        scores: [
          ...state.scores,
          {
            key: generateId(),
            name: state.player,
            score: action.payload,
            date: getDate()
          }
        ]
      }
    case 'SET_PLAYER':
      return {
        ...state,
        player: action.payload
      }
    case 'SET_IMAGES': {
      const catImages = action.payload.cat?.slice(0, NUMBER_OF_CATS).map((image: { url: string }) => ({
        key: generateId(),
        imageUrl: image.url,
        isCorrectAnswer: false
      }))
      const foxImage = {
        key: generateId(),
        imageUrl: action.payload.fox?.image,
        isCorrectAnswer: true
      }
      return {
        ...state,
        images: [...state.images, ...catImages, foxImage]
      }
    }
    case 'SET_LOADER':
      return {
        ...state,
        loading: action.payload
      }
    case 'PURGE_STATE':
      return initialState
    default:
      return state
  }
}

export default Reducer
