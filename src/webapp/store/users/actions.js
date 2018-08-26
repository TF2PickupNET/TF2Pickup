// @flow

import { type User } from '../../../types';

import {
  ADD_USER,
  UPDATE_USER,
} from './types';

export function addUser(user: User) {
  return {
    type: ADD_USER,
    payload: { user },
  };
}

export function updateUser(user: User) {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}
