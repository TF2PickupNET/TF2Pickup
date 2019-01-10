import { AsyncAction } from 'redux';

import UserSettings from '../../../types/UserSettings';
import app from '../../app';
import { getCurrentUserId } from '../user-id/selectors';
import emojiSets from '../../../config/emoji-sets';

import { State } from '..';

import {
  FETCH_FAILED_SETTINGS,
  FETCHED_SETTINGS,
  START_FETCH_SETTINGS,
  Actions, UPDATE_SETTINGS,
} from './types';

function updateSettings(settings: UserSettings): Actions {
  return {
    type: UPDATE_SETTINGS,
    payload: { settings },
  };
}

function updateVolume(volume: number): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('user-settings:change-volume', { volume }, (err) => {
      if (err) {
        // Message.error(`Couldn't change your volume: ${err.message}`, 2);
      } else {
        // Message.success(`Successfully changed your volume to ${volume}%`, 1);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function updateEmojiSet(emojiSet: keyof typeof emojiSets): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('user-settings:change-emoji-set', { emojiSet }, (err) => {
      if (err) {
        // Message.error(`Couldn't change your emoji set: ${err.message}`, 2);
      } else {
        // Message.success(
        //   `Successfully changed your emoji set to ${emojiSets[emojiSet].display}`,
        //   1,
        // );
      }

      return err ? reject(err) : resolve();
    });
  });
}

function fetchSettings(): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    const userId = getCurrentUserId(getState());

    if (userId === null) {
      return;
    }

    dispatch({
      type: START_FETCH_SETTINGS,
      payload: {},
    });

    try {
      const settings = await app.service('user-settings').get(userId);

      dispatch({
        type: FETCHED_SETTINGS,
        payload: { settings },
      });
    } catch (error) {
      dispatch({
        type: FETCH_FAILED_SETTINGS,
        payload: { error },
      });
    }
  };
}

export {
  updateVolume,
  fetchSettings,
  updateEmojiSet,
  updateSettings,
};
