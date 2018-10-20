// @flow

import { type Action } from 'redux';

import { type Message } from '../../../types/Message';

type State = {
  [key: string]: Message,
};

type CreateMessageAction = Action<'MESSAGES/CREATE', { message: Message }>;
type FetchedMessagesAction = Action<'MESSAGES/FETCHED', { messages: $ReadOnlyArray<Message> }>;
type RemoveMessageAction = Action<'MESSAGES/REMOVE', { messageId: string }>;

type Actions = CreateMessageAction | FetchedMessagesAction | RemoveMessageAction;

const CREATE_MESSAGE = 'MESSAGES/CREATE';
const FETCHED_MESSAGES = 'MESSAGES/FETCHED';
const REMOVE_MESSAGE = 'MESSAGES/REMOVE';

export type {
  State,
  Actions,
  CreateMessageAction,
  FetchedMessagesAction,
  RemoveMessageAction,
};

export {
  CREATE_MESSAGE,
  FETCHED_MESSAGES,
  REMOVE_MESSAGE,
};
