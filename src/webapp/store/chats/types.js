// @flow

import { type Action } from 'redux';

import { type Chat as ChatDoc } from '../../../types/Chat';

type Chat = ChatDoc & {
  messages: $ReadOnlyArray<string>,
};
type State = { [key: string]: Chat };
type Actions = Action<'CHATS/FETCHED', { chat: Chat }>
  | Action<'CHATS/ADD-MESSAGE', {
      chatId: string,
      messageId: string,
    }>
  | Action<'CHATS/REMOVE-MESSAGE', {
      chatId: string,
      messageId: string,
    }>;

const FETCHED_CHAT = 'CHATS/FETCHED';
const ADD_MESSAGE_TO_CHAT = 'CHATS/ADD-MESSAGE';
const REMOVE_MESSAGE_FROM_CHAT = 'CHATS/REMOVE-MESSAGE';

export type {
  State,
  Actions,
};

export {
  FETCHED_CHAT,
  ADD_MESSAGE_TO_CHAT,
  REMOVE_MESSAGE_FROM_CHAT,
};
