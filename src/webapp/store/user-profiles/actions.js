// @flow

import { type AsyncAction } from 'redux';

import { type UserProfile } from '../../../types/UserProfile';
import app from '../../app';

import { type State } from '..';

import {
  ADD_PROFILE,
  UPDATE_PROFILE,
  type UpdateProfileAction,
  type AddProfileAction,
} from './types';

function addProfile(profile: UserProfile): AddProfileAction {
  return {
    type: ADD_PROFILE,
    payload: { profile },
  };
}

function updateProfile(profile: UserProfile): UpdateProfileAction {
  return {
    type: UPDATE_PROFILE,
    payload: { profile },
  };
}

function fetchProfile(userId: string): AsyncAction<State> {
  return async (dispatch, getState) => {
    try {
      const profiles = getState().userProfiles;

      if (profiles[userId]) {
        return;
      }

      const profile = await app.service('user-profiles').get(userId);

      dispatch(addProfile(profile));
    } catch (error) {
      console.log('Couldn\'t fetch user-profiles for user', userId, error);
    }
  };
}

export {
  updateProfile,
  addProfile,
  fetchProfile,
};
