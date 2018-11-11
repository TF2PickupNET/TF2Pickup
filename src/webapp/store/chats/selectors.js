// @flow

import { createSelector } from 'reselect';

import { type Chat } from '../../../types/Chat';
import { type State } from '../reducers';

const getChats = state => state.chats;

function makeGetChatById(): (state: State, id: string) => Chat | null {
  return createSelector(
    getChats,
    (state, chatId) => chatId,
    (chats, chatId) => chats[chatId] || null,
  );
}

export { makeGetChatById };
