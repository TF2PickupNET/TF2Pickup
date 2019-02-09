import { createSelector } from 'reselect';
import { defaultSet } from '@config/emoji-sets';
import { DEFAULT_ANNOUNCER } from '@config/announcers';
import { State } from '@webapp/store';

const DEFAULT_VOLUME = 70;

const getSettings = (state: State) => state.settings.item;

const getSettingsStatus = (state: State) => state.settings.status;

const getSettingsError = (state: State) => state.settings.error;

const getVolume: (state: State) => number = createSelector(
  getSettings,
  settings => (settings === null ? DEFAULT_VOLUME : settings.volume),
);

const getEmojiSet = createSelector(
  getSettings,
  settings => (settings === null ? defaultSet : settings.emojiSet),
);

const getAnnouncer = createSelector(
  getSettings,
  settings => (settings === null ? DEFAULT_ANNOUNCER : settings.announcer),
);

export {
  getSettings,
  getVolume,
  getAnnouncer,
  getEmojiSet,
  getSettingsError,
  getSettingsStatus,
};
