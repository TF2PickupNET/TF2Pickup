import debug from 'debug';
import config from 'config';

import setupApp from './setup-app';

const log = debug('TF2Pickup');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const port = config.get('server.port');
const ip = config.get('server.ip');
const protocol = env === 'prod' ? 'https' : 'http';
const url = `${protocol}://${ip}${env === 'dev' ? `:${port}` : ''}`;

/**
 * Start the server.
 */
async function startServer() {
  try {
    const app = await setupApp(url, env);
    const server = app.listen(port);

    server.on('listening', () => {
      app.emit('listening');

      log('Server started on port', port);

      if (process.env.CIRCLECI) {
        process.exit(0); // eslint-disable-line no-process-exit
      }
    });
  } catch (error) {
    log(error.message);

    process.exit(1); // eslint-disable-line no-process-exit
  }
}

process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled promise rejection', promise, reason);
});

startServer();
