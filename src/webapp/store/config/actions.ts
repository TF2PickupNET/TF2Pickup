import { AsyncAction } from 'redux';

import app from '../../app';

import { State } from '..';

import {
  Actions,
  FETCH_ERROR_CONFIG,
  FETCHED_CONFIG,
  START_FETCH_CONFIG,
} from './types';

export function fetchConfig(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    dispatch({
      type: START_FETCH_CONFIG,
      payload: {},
    });

    try {
      const config = await app.service('configuration').get('config');

      dispatch({
        type: FETCHED_CONFIG,
        payload: { config },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR_CONFIG,
        payload: { error },
      });
    }
  };
}
