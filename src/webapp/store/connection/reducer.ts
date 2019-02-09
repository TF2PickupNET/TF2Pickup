import {
  State, Actions, ConnectionActionTypes,
} from './types';

const defaultState: State = {
  isConnected: false,
  isFirstConnect: true,
};

function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case ConnectionActionTypes.CONNECT: {
      return {
        isConnected: true,
        isFirstConnect: false,
      };
    }
    case ConnectionActionTypes.DISCONNECT: {
      return {
        ...state,
        isConnected: false,
      };
    }
    default: return state;
  }
}

export default reducer;
