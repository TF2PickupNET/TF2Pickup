// @flow

import { type AsyncAction } from 'redux';

import { type UserProfile } from '../../../types/user-profile';
import app from '../../app';

import { type State } from '..';

import {
  ADD_PROFILE,
  UPDATE_PROFILE,
  type Actions,
} from './types';

export function fetchProfile(userId: string): AsyncAction<State, Actions> {
  return async (dispatch) => {
    try {
      const profile = await app.service('user-profile').get(userId);

      dispatch({
        type: ADD_PROFILE,
        payload: { profile },
      });
    } catch (error) {
      console.log('Couldn\'t fetch user-profiles for user', userId, error);
    }
  };
}

export function updateProfile(profile: UserProfile) {
  return {
    type: UPDATE_PROFILE,
    payload: { profile },
  };
}
