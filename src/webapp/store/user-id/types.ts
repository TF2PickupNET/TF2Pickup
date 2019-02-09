import { Action } from '@webapp/store';

type State = string | null;

enum UserIdActionTypes {
  LOGIN = 'USER/LOGIN',
  LOGOUT = 'USER/LOGOUT',
}

type Actions =
  | Action<typeof UserIdActionTypes.LOGOUT>
  | Action<typeof UserIdActionTypes.LOGIN, { userId: string }>;

export {
  State,
  Actions,
  UserIdActionTypes,
};
