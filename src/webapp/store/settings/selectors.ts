import { createSelector } from 'reselect';

import { defaultSet } from '../../../config/emoji-sets';

import { State } from '..';

const getSettings = (state: State) => state.settings.item;

const getSettingsStatus = (state: State) => state.settings.status;

const getSettingsError = (state: State) => state.settings.error;

const getVolume: (state: State) => number = createSelector(
  getSettings,
  settings => (settings === null ? 70 : settings.volume),
);

const getEmojiSet = createSelector(
  getSettings,
  settings => (settings === null ? defaultSet : settings.emojiSet),
);

export {
  getSettings,
  getVolume,
  getEmojiSet,
  getSettingsError,
  getSettingsStatus,
};
