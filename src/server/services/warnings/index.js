// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import events from './events';
import hooks from './hooks';

const log = debug('TF2Pickup:users');

export default function warnings(app: App) {
  log('Setting up warnings service');

  app.use('/warnings', service({ Model }));

  app
    .configure(events)
    .service('warnings')
    .hooks(hooks)
    .publish('created', (data) => {
      const connections = app.channel('authenticated');

      return connections.filter(connection => connection.user.id === data.for);
    })
    .publish('patched', (data) => {
      const connections = app.channel('authenticated');

      return connections.filter(connection => connection.user.id === data.for);
    });
}
