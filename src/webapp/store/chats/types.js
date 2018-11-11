// @flow

import { type Action } from 'redux';

import { type Chat } from '../../../types/Chat';

type State = { [key: string]: Chat };
type Actions = Action<'CHATS/FETCHED', { chat: Chat }>;

const FETCHED_CHAT = 'CHATS/FETCHED';

export type {
  FETCHED_CHAT,

  State,
  Actions,
};
