import React, { Context, createContext, ReactElement, ReactNode, useEffect, useReducer, useRef } from 'react'
import Reducer from './reducer'
import { ContextType, IGlobalState } from '../types/store.type'

export const initialState: IGlobalState = {
  loading: true,
  player: '',
  scores: [],
  score: 0,
  images: []
}

/**
 * React Context-based Global Store with a reducer and persistent saves to localStorage.
 **/
export function GlobalStore ({ children }: { children: ReactNode }): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initializeState())
  const initialRenderGlobalState = useRef(true)

  useEffect(() => {
    // Populate localStorage data from globalState.
    if (initialRenderGlobalState.current) {
      initialRenderGlobalState.current = false
      return
    }
    localStorage.setItem('globalState', JSON.stringify(globalState))
  }, [globalState])

  return <globalContext.Provider value={{ globalState, dispatch }}>{children}</globalContext.Provider>
}

export const globalContext: Context<ContextType> = createContext({} as ContextType)

function initializeState (): IGlobalState {
  // Populate the state from Storage.
  const fromLocalStorage: IGlobalState = JSON.parse(localStorage.getItem('globalState') as string) as IGlobalState
  return fromLocalStorage !== null ? fromLocalStorage : initialState
}
