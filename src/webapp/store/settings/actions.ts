import app from '@webapp/app';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import emojiSets from '@config/emoji-sets';
import announcers from '@config/announcers';
import { AsyncAction } from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';

import { SettingsActionTypes } from './types';

function updateVolume(volume: number): AsyncAction {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-volume', { volume });
    } catch (error) {
      console.warn(error);
    }
  };
}

function updateEmojiSet(emojiSet: keyof typeof emojiSets): AsyncAction {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-emoji-set', { emojiSet });
    } catch (error) {
      console.warn(error);
    }
  };
}

function updateAnnouncer(announcer: keyof typeof announcers): AsyncAction {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-announcer', { announcer });
    } catch (error) {
      console.warn(error);
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
      console.warn('Error while fetching settings');
      dispatch({
        type: SettingsActionTypes.FETCH_FAILED,
        payload: { error },
      });
    }
  };
}

export {
  updateVolume,
  fetchSettings,
  updateEmojiSet,
  updateAnnouncer,
};
