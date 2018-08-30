// @flow

import { type Action } from 'redux';

import { type Config } from '../../../types/configuration';

export type State = Config | null;
export type Actions = Action<'CONFIG/SET', { config: Config }>;

export const SET_CONFIG = 'CONFIG/SET';
