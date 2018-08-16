// @flow

import { type UserProfile } from '@tf2pickup/types';

import {
  SET_PROFILE,
  UPDATE_PROFILE,
} from './types';

export function setProfile(profile: UserProfile) {
  return {
    type: SET_PROFILE,
    payload: { profile },
  };
}

export function updateSettings(profile: UserProfile) {
  return {
    type: UPDATE_PROFILE,
    payload: { profile },
  };
}
