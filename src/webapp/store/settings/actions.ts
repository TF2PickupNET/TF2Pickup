import { AsyncAction } from 'redux';

import app from '../../app';
import { getCurrentUserId } from '../user-id/selectors';
import emojiSets from '../../../config/emoji-sets';
import announcers from '../../../config/announcers';

import { State } from '..';

import { SettingsActionTypes, Actions } from './types';
import emitSocketEvent from '../../utils/emit-socket-event';

function updateVolume(volume: number): AsyncAction<State, Actions> {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-volume', { volume });
    } catch (error) {
      console.warn(error);
    }
  };
}

function updateEmojiSet(emojiSet: keyof typeof emojiSets): AsyncAction<State, Actions> {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-emoji-set', { emojiSet });
    } catch (error) {
      console.warn(error);
    }
  };
}

function updateAnnouncer(announcer: keyof typeof announcers): AsyncAction<State, Actions> {
  return async () => {
    try {
      await emitSocketEvent('user-settings:change-announcer', { announcer });
    } catch (error) {
      console.warn(error);
    }
  };
}

function fetchSettings(): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    const userId = getCurrentUserId(getState());

    if (userId === null) {
      return;
    }

    dispatch({
      type: SettingsActionTypes.START_FETCH,
      payload: {},
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
    }
  };
}

export {
  updateVolume,
  fetchSettings,
  updateEmojiSet,
  updateAnnouncer,
};
