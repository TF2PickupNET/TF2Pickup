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
  app.io.on('connect', () => {
    app.store.dispatch(connect());
  });

  app.io.on('disconnect', () => {
    app.store.dispatch(disconnect());
  });
}
