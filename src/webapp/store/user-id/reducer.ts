import {
  UserIdActionTypes, State, Actions,
} from './types';

export default function reducer(state: State | undefined = null, action: Actions): State {
  switch (action.type) {
    case UserIdActionTypes.LOGIN: return action.payload.userId;
    case UserIdActionTypes.LOGOUT: return null;
    default: return state;
  }
}
