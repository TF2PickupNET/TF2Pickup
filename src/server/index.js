import dotenv from 'dotenv';
import path from 'path';
import debug from 'debug';

import setupApp from './setup-app';

const log = debug('TF2Pickup');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { parsed: config } = dotenv.load({ path: path.resolve(__dirname, `../../.env-${env}`) });
const port = config.PORT;
const ip = config.IP;
const protocol = env === 'prod' ? 'https' : 'http';
const url = `${protocol}://${ip}${env === 'dev' ? `:${port}` : ''}`;
const app = setupApp(
  Object.assign({}, config, {
    ip,
    env,
    url,
  }),
);
const server = app.listen(port);

server.on('listening', () => {
  log('Server started on port', port);

  app.service('logs').create({
    message: `Feather server started on ${url}`,
    environment: 'server',
  });
});

process.on('unhandledRejection', (reason, promise) => {
  log('An unhandled promise rejection happened', reason.message);

  app.service('logs').create({
    message: `Unhandled Rejection at: Promise ${promise}`,
    info: reason,
    environment: 'server',
  });
});

export default server;
