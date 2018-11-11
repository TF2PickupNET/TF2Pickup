// @flow

import { type Action } from 'redux';

import { type UserSettings } from '../../../types/UserSettings';

type State = null | UserSettings;
type SetSettingsAction = Action<'SETTINGS/SET', { settings: UserSettings }>;
type UpdateSettingsAction = Action<'SETTINGS/UPDATE', { settings: UserSettings }>;
type Actions = SetSettingsAction | UpdateSettingsAction;

const SET_SETTINGS = 'SETTINGS/SET';
const UPDATE_SETTINGS = 'SETTINGS/UPDATE';

export type {
  SET_SETTINGS,
  UPDATE_SETTINGS,

  State,
  Actions,
  SetSettingsAction,
  UpdateSettingsAction,
};
