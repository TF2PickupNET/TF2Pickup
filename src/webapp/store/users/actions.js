// @flow

import { type AsyncAction } from 'redux';

import {
  type User,
  type UserId,
} from '../../../types/user';
import app from '../../app';

import { type State } from '..';

import {
  ADD_USER,
  UPDATE_USER,
  type Actions,
} from './types';

export function fetchUser(userId: UserId): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    const state = getState();

    if (state.users[userId]) {
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
