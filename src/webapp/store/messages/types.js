// @flow

import { type Action } from 'redux';

import { type Message } from '../../../types/Message';

type State = { [key: string]: Message };

type CreateMessageAction = Action<'MESSAGES/CREATE', { message: Message }>;
type FetchedMessagesAction = Action<'MESSAGES/FETCHED', { messages: $ReadOnlyArray<Message> }>;
type UpdateMessageAction = Action<'MESSAGES/UPDATE', { message: Message }>;

type Actions = CreateMessageAction | FetchedMessagesAction | UpdateMessageAction;

const CREATE_MESSAGE = 'MESSAGES/CREATE';
const FETCHED_MESSAGES = 'MESSAGES/FETCHED';
const UPDATE_MESSAGE = 'MESSAGES/UPDATE';

export type {
  State,
  Actions,
  CreateMessageAction,
  FetchedMessagesAction,
  UpdateMessageAction,
};

export {
  CREATE_MESSAGE,
  FETCHED_MESSAGES,
  UPDATE_MESSAGE,
};
