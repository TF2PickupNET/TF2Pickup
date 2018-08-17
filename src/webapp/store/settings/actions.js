// @flow

import { type UserSettings } from '../../../types';

import {
  SET_SETTINGS,
  UPDATE_SETTINGS,
} from './types';

export function setSettings(settings: UserSettings) {
  return {
    type: SET_SETTINGS,
    payload: { settings },
  };
}

export function updateSettings(settings: UserSettings) {
  return {
    type: UPDATE_SETTINGS,
    payload: { settings },
  };
}
