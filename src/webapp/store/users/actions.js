// @flow

import { type Dispatch } from 'redux';
import { type ClientApp } from '@feathersjs/feathers';

import {
  type User,
  type UserId,
} from '../../../types/user';

import { type State } from '..';

import {
  ADD_USER,
  UPDATE_USER,
  type Actions,
} from './types';

export function fetchUser(userId: UserId) {
  return async (
    dispatch: Dispatch<Actions>,
    getState: () => State,
    app: ClientApp,
  ) => {
    const users = getState().users;

    if (users[userId]) {
      return;
    }

    try {
      const user = await app.service('users').get(userId);

      dispatch({
        type: ADD_USER,
        payload: { user },
      });
    } catch (error) {
      console.error('Error while fetching a userId', userId, error.message);
    }
  };
}

export function updateUser(user: User) {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}
