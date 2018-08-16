// @flow

import { type Action } from 'redux';
import { type UserSettings } from '@tf2pickup/types';

export type State = null | UserSettings;
export type Actions = Action<'SETTINGS/SET', { settings: State }>
  | Action<'SETTINGS/UPDATE', { settings: UserSettings }>;

export const SET_SETTINGS = 'SETTINGS/SET';
export const UPDATE_SETTINGS = 'SETTINGS/UPDATE';