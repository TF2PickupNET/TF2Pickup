// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

export const getSettings = (state: State) => state.settings;

export const getVolume = createSelector(
  getSettings,
  settings => (settings === null ? 70 : settings.volume),
);
