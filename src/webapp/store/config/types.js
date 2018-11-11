// @flow

import { type Action } from 'redux';

import { type Config } from '../../../types/Configuration';

type State = Config | null;
type Actions = Action<'CONFIG/SET', { config: Config }>;

const SET_CONFIG = 'CONFIG/SET';

export type {
  SET_CONFIG,

  State,
  Actions,
};
