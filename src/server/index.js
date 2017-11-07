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
    const app = await setupApp(url);

    app.set('env', env);

    const server = app.listen(port);

    server.on('listening', () => {
      app.emit('listening');

      log('Server started on port', port);

      if (process.env.IS_CI_TEST) {
        process.exit(0); // eslint-disable-line no-process-exit
      }

      app.service('logs').create({
        message: `Feather server started on ${url}`,
        environment: 'server',
      });
    });
  } catch (error) {
    log(error.message);

    process.exit(1); // eslint-disable-line no-process-exit
  }
}

process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled promise rejection', promise);
});

startServer();
