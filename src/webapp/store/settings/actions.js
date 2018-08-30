// @flow

import { type AsyncAction } from 'redux';

import { type UserSettings } from '../../../types/user-settings';
import app from '../../app';

import { type State } from '..';

import {
  SET_SETTINGS,
  UPDATE_SETTINGS,
  type Actions,
} from './types';

export function fetchSettings(): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    const userId = getState().userId;

    if (userId === null) {
      return;
    }

    const settings = await app.service('user-settings').get(userId);

    dispatch({
      type: SET_SETTINGS,
      payload: { settings },
    });
  };
}

export function updateSettings(settings: UserSettings) {
  return {
    type: UPDATE_SETTINGS,
    payload: { settings },
  };
}
