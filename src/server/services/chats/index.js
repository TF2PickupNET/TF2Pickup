// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import setup from './setup';

const log = debug('TF2Pickup:chats');

export default function chats(app: App) {
  log('Setting up messages service');

  app.use('/chats', service({
    Model,
    id: 'id',
  }));

  app.configure(setup);
}
