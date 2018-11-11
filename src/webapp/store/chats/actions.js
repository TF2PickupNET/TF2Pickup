// @flow

import { type ClientApp } from '@feathersjs/feathers';
import { type Dispatch } from 'redux';

import { type State } from '../reducers';
import { fetchMessages } from '../messages/actions';
import { type Actions as MessagesActions } from '../messages/types';

import {
  FETCHED_CHAT,
  type Actions,
} from './types';

export function fetchChat(chatId: string) {
  return async (
    dispatch: Dispatch<Actions | MessagesActions>,
    getState: () => State,
    app: ClientApp,
  ) => {
    const [
      chat,
      messages,
    ] = await Promise.all([
      app.service('chats').get(chatId),
      app.service('messages').find({
        query: { chatId },
        $limit: 40,
      }),
    ]);

    dispatch({
      type: FETCHED_CHAT,
      payload: { chat },
    });

    dispatch(fetchMessages(messages));
  };
}
