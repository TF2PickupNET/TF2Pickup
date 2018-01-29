import {
  closeDialog,
  openDialog,
} from '../dialog/actions';

import {
  connect,
  disconnect,
} from './actions';

/**
 * Setup the event listeners for the connected store.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  /**
   * Dispatch multiple actions when the socket disconnects from the server.
   */
  const onDisconnect = () => {
    app.store.dispatch(disconnect());

    app.store.dispatch(openDialog('NO_CONNECTION_DIALOG'));
  };
  const timeout = setTimeout(onDisconnect, 1000);

  app.io.on('connect', () => {
    app.store.dispatch(connect());

    clearTimeout(timeout);

    app.store.dispatch(closeDialog());
  });

  app.io.on('disconnect', onDisconnect);
}
