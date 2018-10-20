// @flow

import { type Message } from '../../../types/Message';

import {
  CREATE_MESSAGE,
  FETCHED_MESSAGES,
  REMOVE_MESSAGE,
  type CreateMessageAction,
  type FetchedMessagesAction,
  type RemoveMessageAction,
} from './types';

export function createMessage(message: Message): CreateMessageAction {
  return {
    type: CREATE_MESSAGE,
    payload: { message },
  };
}

export function fetchMessages(messages: $ReadOnlyArray<Message>): FetchedMessagesAction {
  return {
    type: FETCHED_MESSAGES,
    payload: { messages },
  };
}

export function removeMessage(messageId: string): RemoveMessageAction {
  return {
    type: REMOVE_MESSAGE,
    payload: { messageId },
  };
}
