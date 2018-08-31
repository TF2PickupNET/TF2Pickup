// @flow

import { type ClientApp } from '@feathersjs/feathers';
import { type Dispatch } from 'redux';

import { type UserProfile } from '../../../types/user-profile';

import { type State } from '..';

import {
  ADD_PROFILE,
  UPDATE_PROFILE,
  type Actions,
} from './types';

export function fetchProfile(userId: string) {
  return async (
    dispatch: Dispatch<Actions>,
    getState: () => State,
    app: ClientApp,
  ) => {
    try {
      const profiles = getState().userProfiles;

      if (profiles[userId]) {
        return;
      }

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
