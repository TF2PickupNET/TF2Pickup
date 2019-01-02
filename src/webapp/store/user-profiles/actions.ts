import { AsyncAction } from 'redux';

import UserProfile from '../../../types/UserProfile';
import app from '../../app';

import { State } from '..';

import {
  UPDATE_PROFILE,
  Actions, FETCHED_PROFILE, FETCH_ERROR_PROFILE, START_FETCH_PROFILE,
} from './types';
import {makeGetProfileStatus} from "./selectors";
import {AsyncStatus} from "../types";

function updateProfile(profile: UserProfile): Actions {
  return {
    type: UPDATE_PROFILE,
    payload: { profile },
  };
}

function fetchProfile(userId: string | null): AsyncAction<State, Actions> {
  const getProfileStatus = makeGetProfileStatus();

  return async (dispatch, getState) => {
    if (userId === null || getProfileStatus(getState(), userId) !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: START_FETCH_PROFILE,
      payload: { userId },
    });

    try {
      const profile = await app.service('user-profiles').get(userId);

      dispatch({
        type: FETCHED_PROFILE,
        payload: { profile },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR_PROFILE,
        payload: {
          userId,
          error,
        },
      });
    }
  };
}

export {
  updateProfile,
  fetchProfile,
};
