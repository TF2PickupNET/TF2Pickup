import feathers from 'feathers';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio';
import handler from 'feathers-errors/handler';
import debug from 'debug';
import config from 'config';

import { pluck } from '../utils/functions';

import setupDebug from './setup-debug';
import services from './services';
import globalHooks from './global-hooks';
import client from './client';

const log = debug('TF2Pickup');

/**
 * Setup the feathers app and configure all of the parts.
 *
 * @param {String} url - URL for the app.
 * @param {String} env - The environment the server is started in.
 * @returns {Object} - Returns the app.
 */
export default async function setupApp(url, env) {
  if (env === 'prod') {
    await setupDebug();
  }

  log('Creating Feathers app');

  const app = feathers();
  const mongourl = config.get('mongourl');

  app.set('env', env);
  app.set('url', url);

  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(mongourl);
  } catch (error) { // eslint-disable-line no-unused-vars
    console.log(process.env); // eslint-disable-line

    if (!process.env.CIRCLECI) {
      throw new Error(`Can't connect to MongoDB server with url: ${mongourl}`);
    }
  }

  app
    .options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  app
    .configure(hooks())
    .configure(socketio({
      path: '/ws/',
      wsEngine: 'uws',
    }));

  app.use((req, res, next) => {
    req.feathers = {}; // eslint-disable-line no-param-reassign

    next();
  });

  app
    .hooks(globalHooks)
    .configure(services)
    .configure(client);

  app.use(handler({
    async html(error, req, res) {
      log('An error occurred!', error.message);

      const { _id } = await app.service('errors').create({
        message: error.message,
        info: error,
        steamId: pluck('feathers.user.id')(req),
      });

      res.redirect(`/error?message=${error.message}&code=${error.code}&id=${_id}`);
    },
  }));

  return app;
}
