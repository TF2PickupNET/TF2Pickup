// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import events from './events';

const log = debug('TF2Pickup:messages');

export default function messages(app: App) {
  log('Setting up messages service');

  app.use('/messages', service({
    Model,
    id: '_id',
  }));

  app
    .configure(events)
    .service('messages')
    .publish('created', () => app.channel('authenticated'))
    .publish('removed', () => app.channel('authenticated'));
}
