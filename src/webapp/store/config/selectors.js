// @flow

import { createSelector } from 'reselect';

import { type State } from '../reducers';
import { type Config } from '../../../types/Configuration';

const getConfig = (state: State): Config | null => state.config;

const getVersion: (state: State) => string | null = createSelector(
  getConfig,
  config => (config === null ? null : config.version),
);

export {
  getVersion,
  getConfig,
};
