import app from '@webapp/app';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import emojiSets from '@config/emoji-sets';
import announcers from '@config/announcers';
import { AsyncAction } from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';

import { SettingsActionTypes } from './types';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';

function updateVolume(volume: number): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('user-settings:change-volume', { volume });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while updating your volume setting: ${error.name}`,
          2 * 1000,
        ),
      );
    }
  };
}

function updateEmojiSet(emojiSet: keyof typeof emojiSets): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('user-settings:change-emoji-set', { emojiSet });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while updating your emoji setting: ${error.name}`,
          2 * 1000,
        ),
      );
    }
  };
}

function updateAnnouncer(announcer: keyof typeof announcers): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('user-settings:change-announcer', { announcer });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while updating your announcer setting: ${error.name}`,
          2 * 1000,
        ),
      );
    }
  };
}

function fetchSettings(): AsyncAction {
  return async (dispatch, getState) => {
    const userId = getCurrentUserId(getState());

    if (userId === null) {
      return;
    }

    dispatch({
      type: SettingsActionTypes.START_FETCH,
      payload: null,
    });

    try {
      const settings = await app.service('user-settings').get(userId);

      dispatch({
        type: SettingsActionTypes.FETCHED,
        payload: { settings },
      });
    } catch (error) {
      dispatch({
        type: SettingsActionTypes.FETCH_FAILED,
        payload: { error },
      });

      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while fetching your settings: ${error.name}`,
          2 * 1000,
        ),
      );
    }
  };
}

export {
  updateVolume,
  fetchSettings,
  updateEmojiSet,
  updateAnnouncer,
};
