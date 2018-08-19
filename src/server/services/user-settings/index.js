// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';

const log = debug('TF2Pickup:user-settings');

export default function userSettings(app: App) {
  log('Setting up user-settings service');

  app.use('/user-settings', service({
    Model,
    id: 'id',
  }));

  app
    .service('user-settings')
    .hooks(hooks)
    // Publish the events only to the user that owns the document
    .publish(
      'patched',
      data => app.channel('authenticated').filter(connection => connection.user.id === data.id)
    );
}
