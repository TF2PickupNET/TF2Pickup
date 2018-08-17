// @flow

import debug from 'debug';
import config from 'config';

import createApp from './create-app';

const log = debug('TF2Pickup');
const port: number = config.get('server.port');

/**
 * Start the server.
 */
async function startServer() {
  try {
    const app = await createApp();
    const server = app.listen(port);

    server.on('listening', () => {
      log('Server started on port', port);

      app.emit('listening');
    });
  } catch (error) {
    log('Failed to create app', error);

    process.exit(1); // eslint-disable-line unicorn/no-process-exit
  }
}

process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled promise rejection', promise, reason);
});

startServer();
