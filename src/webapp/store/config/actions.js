// @flow

import { type AsyncAction } from 'redux';

import { type State } from '..';

import app from '../../app';

import { SET_CONFIG } from './types';

export function fetchConfig(): AsyncAction<State> {
  return async (dispatch) => {
    const config = await app.service('configuration').get('config');

    dispatch({
      type: SET_CONFIG,
      payload: { config },
    });
  };
}
