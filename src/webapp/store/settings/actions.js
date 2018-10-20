// @flow

import { type Dispatch } from 'redux';
import { type ClientApp } from '@feathersjs/feathers';

import { type UserSettings } from '../../../types/UserSettings';

import { type State } from '..';

import {
  SET_SETTINGS,
  UPDATE_SETTINGS,
  type Actions,
} from './types';

export function fetchSettings() {
  return async (
    dispatch: Dispatch<Actions>,
    getState: () => State,
    app: ClientApp
  ) => {
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
