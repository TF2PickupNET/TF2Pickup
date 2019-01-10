import { Action } from 'redux';

type State = string | null;

const LOGIN_USER = 'USER/LOGIN';
const LOGOUT_USER = 'USER/LOGOUT';

type Actions =
  | Action<typeof LOGOUT_USER>
  | Action<typeof LOGIN_USER, { userId: string }>;

export {
  State,
  Actions,
  LOGIN_USER,
  LOGOUT_USER,
};
