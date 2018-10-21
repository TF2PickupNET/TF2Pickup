// @flow

import { createSelector } from 'reselect';

const getMessages = state => state.messages;

export function makeGetMessageById() {
  return createSelector(
    getMessages,
    (state, id) => id,
    (messages, id) => messages[id] || null,
  );
}
