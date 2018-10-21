// @flow

import { createSelector } from 'reselect';

const getChats = state => state.chats;

export function makeGetChatById() {
  return createSelector(
    getChats,
    (state, chatId) => chatId,
    (chats, chatId) => chats[chatId] || null,
  );
}

export function makeGetMessagesForChat() {
  return createSelector(
    makeGetChatById(),
    chat => (chat === null ? [] : chat.messages),
  );
}
