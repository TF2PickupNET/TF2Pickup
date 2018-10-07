// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import setupEvents from './setup-events';

const log = debug('TF2Pickup:user-profiles');

export default function userProfiles(app: App) {
  log('Setting up user-profiles service');

  app.use('/user-profiles', service({
    Model,
    id: 'id',
  }));

  app
    .configure(setupEvents)
    .service('user-profiles')
    .hooks(hooks)
    // Publish the events only to the userId that owns the document
    .publish(
      'patched',
      data => app.channel('authenticated').filter(connection => connection.user.id === data.id)
    );
}
