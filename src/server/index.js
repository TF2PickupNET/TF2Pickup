import dotenv from 'dotenv';
import path from 'path';

import setupApp from './setup-app';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { parsed: config } = dotenv.load({ path: path.resolve(__dirname, `../../.env-${env}`) });
const port = config.PORT;
const ip = config.IP;
const protocol = env === 'prod' ? 'https' : 'http';
const url = `${protocol}://${ip}${env === 'dev' ? `:${port}` : ''}`;

/**
 * Start the server.
 */
async function startServer() {
  try {
    const app = await setupApp({
      ...config,
      ip,
      env,
      url,
    });
    const server = app.listen(port);

    server.on('listening', () => {
      app.service('logs').create({
        message: `Feather server started on ${url}`,
        environment: 'server',
      });
    });
  } catch (error) {
    console.log('Error while setting up app', error);

    process.exit();
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection', promise);
});

startServer();
