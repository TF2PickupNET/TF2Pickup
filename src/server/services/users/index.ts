import { ServerApp } from '@feathersjs/feathers';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import events from './events';

const log = debug('TF2Pickup:users');

export default function users() {
  return (app: ServerApp) => {
    log('Setting up users service');

    app.use('/users', service({
      Model,
      id: 'id',
    }));

    app
      .configure(events)
      .service('users')
      .hooks(hooks)
      .publish('patched', () => app.channel('authenticated'));
  };
}
