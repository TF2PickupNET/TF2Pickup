import feathers, { ServerApp, ServerSocket } from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import mongoose from 'mongoose';
import config from 'config';
import debug from 'debug';
import cookie from 'cookie-parser';

import hooks from './hooks';
import services from './services';
import configureChannels from './configure-channels';
import render from './ErrorPage/render';
import { setupSteam } from './utils/steam-community';
import configureDebug from './configure-debug';

mongoose.Promise = Promise;

const log = debug('TF2Pickup:create-app');
const mongoUrl = config.get<string>('server.mongourl');

export default async function createApp() {
  log('Creating Feathers App');
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });
  await setupSteam();

  const app = express(feathers<ServerApp>());

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // @ts-ignore
    .use(cookie())
    .hooks(hooks)
    .configure(express.rest())
    .configure(socketio({ path: '/ws/' }, (io) => {
      io.on('connection', (socket: ServerSocket) => {
        app.emit('socket-connection', socket);
      });
    }))
    .configure(services())
    .configure(configureChannels())
    .configure(configureDebug());

  app
    .use(express.notFound({ verbose: true }))
    .use(express.errorHandler({
      html(error, _, res) {
        res.send(render(error));
      },
      logger: false,
    }));

  return app;
}
