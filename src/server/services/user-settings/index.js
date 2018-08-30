// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import events from './events';

const log = debug('TF2Pickup:userId-settings');

export default function userSettings(app: App) {
  log('Setting up userId-settings service');

  app.use('/userId-settings', service({
    Model,
    id: 'id',
  }));

  app
    .configure(events)
    .service('user-settings')
    .hooks(hooks)
    // Publish the events only to the userId that owns the document
    .publish(
      'patched',
      data => app.channel('authenticated').filter(connection => connection.user.id === data.id)
    );
}
