import React, { Dispatch } from 'react'

export interface IImage {
  key: string
  imageUrl: string
  isCorrectAnswer: boolean
}

export interface IGlobalState {
  scores: Array<number>
  score: number
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
