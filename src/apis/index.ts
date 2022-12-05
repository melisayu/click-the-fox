import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { ActionType } from '../types/store.type'

export async function getAllImages (urls: string[], stateSetter: Dispatch<ActionType>): Promise<void> {
  console.log('how many times??222')
  await axios
    .all(urls.map(async (url) => await axios.get(url)))
    .then(axios.spread((catResponse, foxResponse) => {
      stateSetter({
        type: 'SET_IMAGES',
        payload: {
          cat: catResponse.data,
          fox: foxResponse.data
        }
      })
    }))
    .catch((error) => {
      return error
    })
}
