// @flow

import { type AsyncAction } from 'redux';
import { message } from 'antd';

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

function fetchProfile(userId: string, cb?: (error: Error | null) => void): AsyncAction<State> {
  return async (dispatch, getState) => {
    try {
      const profiles = getState().userProfiles;

      if (profiles[userId]) {
        if (cb) {
          cb(null);
        }

        return;
      }

      const profile = await app.service('user-profiles').get(userId);

      dispatch(addProfile(profile));

      if (cb) {
        cb(null);
      }
    } catch (error) {
      message.error(`Error while fetching profile for user ${userId}: ${error.message}`);

      if (cb) {
        cb(error);
      }
    }
  };
}

export {
  updateProfile,
  addProfile,
  fetchProfile,
};
