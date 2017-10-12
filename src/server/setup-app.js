import feathers from 'feathers';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import handler from 'feathers-errors/handler';
import debug from 'debug';
import config from 'config';

import services from './services';
import globalHooks from './global-hooks';
import client from './client';

const log = debug('TF2Pickup');

/**
 * Setup the feathers app and configure all of the parts.
 *
 * @param {String} url - URL for the app.
 * @returns {JSX} - Returns the app.
 */
export default async function setupApp(url) {
  log('Creating Feathers app');

  const app = feathers();
  const mongourl = config.get("server.mongourl");

  app.set("url", url);

  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(mongourl, { useMongoClient: true });
  } catch (error) { // eslint-disable-line no-unused-vars
    throw new Error(`Can't connect to MongoDB server with url: ${mongourl}`);
  }

  app
    .options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  app
    .configure(hooks())
    .configure(rest())
    .configure(socketio({
      path: '/ws/',
      wsEngine: 'uws',
    }));

  app
    .hooks(globalHooks)
    .configure(services)
    .configure(client);

  app.use(handler({
    async html(error, req, res) {
      log('An error occurred!', error.message);

      const { _id } = await app.service('logs').create({
        message: 'Something went wrong on the server!',
        info: error,
        environment: 'server',
      });

      res.redirect(`/error?message=${error.message}&code=${error.code}&id=${_id}`);
    },
  }));

  return app;
}
