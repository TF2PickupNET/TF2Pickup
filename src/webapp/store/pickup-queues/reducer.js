// @flow

import { gamemodes } from '../../../config';

import {
  FETCHED_QUEUE,
  RESET_QUEUES,
  UPDATE_QUEUE,
  type State,
  type Actions,
} from './types';

const defaultState = Object.keys(gamemodes).reduce((state, gamemode) => {
  return {
    ...state,
    [gamemode]: null,
  };
}, {});

export default function reducer(state: State = defaultState, action: Actions) {
  switch (action.type) {
    case RESET_QUEUES: return defaultState;
    case FETCHED_QUEUE: {
      const { gamemode } = action.payload.queue;

      if (state[gamemode]) {
        return state;
      }

      return {
        ...state,
        [gamemode]: action.payload.queue,
      };
    }
    case UPDATE_QUEUE: {
      return {
        ...state,
        [action.payload.queue.gamemode]: action.payload.queue,
      };
    }
    default: return state;
  }
}
