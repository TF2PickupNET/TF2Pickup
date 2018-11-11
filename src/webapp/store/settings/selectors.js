// @flow

import { createSelector } from 'reselect';

import { emojiSets } from '../../../config';

import { type State } from '..';

const getSettings = (state: State) => state.settings;

const getVolume: (state: State) => number = createSelector(
  getSettings,
  settings => (settings === null ? 70 : settings.volume),
);

const getEmojiSet: (state: State) => $Keys<typeof emojiSets> = createSelector(
  getSettings,
  settings => (settings === null ? 'emojione' : settings.emojiSet),
);

export {
  getSettings,
  getVolume,
  getEmojiSet,
};
