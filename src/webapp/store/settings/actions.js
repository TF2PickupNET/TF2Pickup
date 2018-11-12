// @flow

import { type AsyncAction } from 'redux';
import { message } from 'antd';

import { type UserSettings } from '../../../types/UserSettings';
import app from '../../app';

import { type State } from '..';

import { getCurrentUserId } from '../user-id/selectors';

import {
  SET_SETTINGS,
  UPDATE_SETTINGS,
  type UpdateSettingsAction,
  type SetSettingsAction,
} from './types';

function updateSettings(settings: UserSettings): UpdateSettingsAction {
  return {
    type: UPDATE_SETTINGS,
    payload: { settings },
  };
}

function setSettings(settings: UserSettings): SetSettingsAction {
  return {
    type: SET_SETTINGS,
    payload: { settings },
  };
}

function updateVolume(volume: number): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('user-settings:change-volume', { volume }, (err) => {
      if (err) {
        message.error(`Couldn't change your volume: ${err.message}`);
      } else {
        message.success(`Successfully changed your volume to ${volume}%`);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function fetchSettings(cb?: (error: Error | null) => void): AsyncAction<State> {
  return async (dispatch, getState) => {
    const userId = getCurrentUserId(getState());

    if (userId === null) {
      if (cb) {
        cb(null);
      }

      return;
    }

    try {
      const settings = await app.service('user-settings').get(userId);

      dispatch(setSettings(settings));

      if (cb) {
        cb(null);
      }
    } catch (error) {
      message.error(`Error while fetching settings: ${error.message}`);

      if (cb) {
        cb(error);
      }
    }
  };
}

export {
  updateVolume,
  fetchSettings,
  updateSettings,
};
