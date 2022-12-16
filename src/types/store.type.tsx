import React, { Dispatch } from 'react'
import { Score } from './score.type'

export interface IImage {
  key: string
  imageUrl: string
  isCorrectAnswer: boolean
}

export interface IGlobalState {
  player: string
  scores: Array<Score>
  images: Array<IImage>
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: IGlobalState;
  dispatch: Dispatch<ActionType>;
};
