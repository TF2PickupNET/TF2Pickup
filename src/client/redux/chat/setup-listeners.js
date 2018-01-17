import { subDays } from 'date-fns/esm';

import {
  arrayToObject,
  pluck,
} from '../../../utils/functions';

import {
  addMessage,
  removeMessage,
  replaceMessages,
} from './actions';

const transformMessages = arrayToObject(pluck('_id'));
const getRegion = pluck('user.settings.region', 'eu');

/**
 * Setup the listeners for the chat.
 *
 * @param {Object} app - The feathers app object.
 */
export default function setupListeners(app) {
  const chatService = app.service('chat');
  const yesterday = subDays(new Date(), 1);
  const fetchMessages = chat => chatService.find({
    query: {
      $limit: 50,
      $sort: { createdOn: -1 },
      createdOn: { $gt: yesterday },
      chat,
      removed: false,
    },
  });

  chatService.on('created', (message) => {
    app.store.dispatch(addMessage(message));
  });

  chatService.on('patched', (message) => {
    app.store.dispatch(removeMessage(message._id, message.chat));
  });

  app.on('state.change', async (prevState, newState) => {
    const hasReconnected = !prevState.connected && newState.connected;
    const prevRegion = getRegion(prevState);
    const nextRegion = getRegion(newState);

    if (hasReconnected) {
      const messages = await fetchMessages('global');

      app.store.dispatch(
        replaceMessages('global', transformMessages(messages)),
      );
    }

    if (hasReconnected || prevRegion !== nextRegion) {
      const messages = await fetchMessages(nextRegion);

      app.store.dispatch(
        replaceMessages(nextRegion, transformMessages(messages)),
      );
    }
  });
}
