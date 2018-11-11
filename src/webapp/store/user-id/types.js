// @flow

import { type Action } from 'redux';

type State = string | null;
type LogoutUserAction = Action<'USER/LOGOUT', {}>;
type LoginUserAction = Action<'USER/LOGIN', { userId: string }>;

type Actions = LogoutUserAction | LoginUserAction;

const LOGIN_USER = 'USER/LOGIN';
const LOGOUT_USER = 'USER/LOGOUT';

export type {
  LOGIN_USER,
  LOGOUT_USER,

  State,
  Actions,
  LoginUserAction,
  LogoutUserAction,
};
