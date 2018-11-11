// @flow

import { createSelector } from 'reselect';

import { type Message } from '../../../types/Message';
import { type State } from '../reducers';

const getMessages = (state: State) => state.messages;

function makeGetMessageById(): (state: State, id: string) => Message | null {
  return createSelector(
    getMessages,
    (state, id) => id,
    (messages, id) => messages[id] || null,
  );
}

function makeGetMessageIdsForChat(): (state: State, chatId: string) => $ReadOnlyArray<string> {
  return createSelector(
    getMessages,
    (state, chatId) => chatId,
    (messages, chatId) => Object
      .keys(messages)
      .filter(messageId => messages[messageId].chatId === chatId),
  );
}

export {
  makeGetMessageIdsForChat,
  makeGetMessageById,
};
