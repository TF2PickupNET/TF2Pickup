import {
  LOGIN_USER,
  LOGOUT_USER,
  State,
  Actions,
} from './types';

export default function reducer(state: State | undefined = null, action: Actions): State {
  switch (action.type) {
    case LOGIN_USER: return action.payload.userId;
    case LOGOUT_USER: return null;
    default: return state;
  }
}
