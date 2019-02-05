import { createSelector } from 'reselect';

import { State } from '@webapp/store';

const getConfig = (state: State) => state.config.item;
const getConfigStatus = (state: State) => state.config.status;
const getConfigError = (state: State) => state.config.error;

const getVersion = createSelector(
  getConfig,
  config => (config === null ? null : config.version),
);

export {
  getVersion,
  getConfigStatus,
  getConfig,
  getConfigError,
};
