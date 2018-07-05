// @flow

import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import mongoose from 'mongoose';
import config from 'config';

import hooks from './hooks';
import services from './services';

mongoose.Promise = global.Promise;

const mongoUrl = config.get('server.mongourl');

export default async function createApp() {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  const app = express(feathers());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.hooks(hooks);

  app
    .configure(express.rest())
    .configure(socketio({
      path: '/ws/',
      wsEngine: 'uws',
    }))
    .configure(services);

  app.use(express.notFound({ verbose: true }));
  app.use(express.errorHandler());

  return app;
}
