// @flow

import { type User } from '../../../types/User';

type State = { [key: string]: User };
type Actions = {
  type: 'USERS/UPDATE' | 'USERS/ADD',
  payload: { user: User },
};

const UPDATE_USER = 'USERS/UPDATE';
const ADD_USER = 'USERS/ADD';

export type {
  State,
  Actions,
};
export {
  UPDATE_USER,
  ADD_USER,
};
