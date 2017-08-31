import dotenv from 'dotenv';
import path from 'path';

import setupApp from './setup-app';

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
  app.service('logs').create({
    message: `Feather server started on ${url}`,
    environment: 'server',
  });
});

process.on('unhandledRejection', (reason, promise) => {
  app.service('logs').create({
    message: `Unhandled Rejection at: Promise ${promise}`,
    info: reason,
    environment: 'server',
  });
});

export default server;
