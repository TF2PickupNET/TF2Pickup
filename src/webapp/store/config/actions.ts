import app from '@webapp/app';
import { AsyncAction } from '@webapp/store';

import { ConfigActionTypes } from './types';
import { NotificationType } from '@webapp/store/notifications/types';
import { createNotification } from '@webapp/store/notifications/actions';

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
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while fetching config: ${error.message}`,
          5 * 1000,
        ),
      );

      dispatch({
        type: ConfigActionTypes.FETCH_ERROR,
        payload: { error },
      });
    }
  };
}
