import {createSelector} from 'reselect';

import {State} from '..';

const getConfig = (state: State) => state.config.item;
const getConfigStatus = (state: State) => state.config.status;
const getConfigError = (state: State) => state.config.error;

const getVersion = createSelector(
  getConfig,
  config => config !== null ? config.version : null,
);

export {
  getVersion,
  getConfigStatus,
  getConfig,
  getConfigError,
};
