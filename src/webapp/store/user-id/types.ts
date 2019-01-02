import { Action } from 'redux';

type State = string | null;

const LOGIN_USER = 'USER/LOGIN';
const LOGOUT_USER = 'USER/LOGOUT';

type LogoutUserAction = Action<typeof LOGOUT_USER, {}>;
type LoginUserAction = Action<typeof LOGIN_USER, { userId: string }>;

type Actions = LogoutUserAction | LoginUserAction;

export {
  State,
  Actions,
  LOGIN_USER,
  LOGOUT_USER,
};
