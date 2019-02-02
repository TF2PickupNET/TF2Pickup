import { AsyncAction } from 'redux';

import app from '../../app';

import { State } from '..';

import { Actions, ConfigActionTypes } from './types';

export function fetchConfig(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    dispatch({
      type: ConfigActionTypes.START_FETCH,
      payload: {},
    });

    try {
      const config = await app.service('configuration').get('config');

      dispatch({
        type: ConfigActionTypes.FETCHED,
        payload: { config },
      });
    } catch (error) {
      dispatch({
        type: ConfigActionTypes.FETCH_ERROR,
        payload: { error },
      });
    }
  };
}
