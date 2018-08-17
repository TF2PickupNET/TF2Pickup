// @flow

import { type Config } from '../../../types';

import { SET_CONFIG } from './types';

export function setConfig(config: Config) {
  return {
    type: SET_CONFIG,
    payload: { config },
  };
}
