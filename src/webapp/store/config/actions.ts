import app from '@webapp/app';
import { AsyncAction } from '@webapp/store';

import { ConfigActionTypes } from './types';

export function fetchConfig(): AsyncAction {
  return async (dispatch) => {
    dispatch({
      type: ConfigActionTypes.START_FETCH,
      payload: null,
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
