// @flow

import {
  type State,
  type Actions,
  FETCHED_CHAT,
} from './types';

export default function reducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case FETCHED_CHAT: return {
      ...state,
      [action.payload.chat.id]: action.payload.chat,
    };
    default: return state;
  }
}
