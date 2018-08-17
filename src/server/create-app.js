// @flow

import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import mongoose from 'mongoose';
import config from 'config';
import debug from 'debug';
import cookieParser from 'cookie-parser';

import hooks from './hooks';
import services from './services';
import channels from './channels';
import render from './ErrorPage/render';

mongoose.Promise = global.Promise;

const log = debug('TF2Pickup:create-app');
const mongoUrl = config.get('server.mongourl');

export default async function createApp() {
  log('Creating Feathers App');
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  const app = express(feathers());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.hooks(hooks);

  app
    .configure(express.rest())
    .configure(socketio({ path: '/ws/' }, (io) => {
      io.on('connection', (socket) => {
        app.emit('socket-connection', socket);
      });
    }))
    .configure(services)
    .configure(channels);

  app.use(express.notFound({ verbose: true }));
  app.use(express.errorHandler({
    html(error, req, res) {
      res.send(render(error));
    },
    logger: false,
  }));

  return app;
}
