// @flow

import { type AsyncAction } from 'redux';

import app from '../../app';

import { type State } from '..';

import {
  SET_CONFIG,
  type Actions,
} from './types';

export function fetchConfig(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    const config = await app.service('configuration').get('config');

    dispatch({
      type: SET_CONFIG,
      payload: { config },
    });
  };
}
