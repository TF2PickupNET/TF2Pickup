import { ServerApp } from '@feathersjs/feathers';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import events from './events';
import UserSettings from "../../../types/UserSettings";

const log = debug('TF2Pickup:user-settings');

export default function userSettings() {
  return (app: ServerApp) => {
    log('Setting up user-settings service');

    app.use('/user-settings', service({
      Model,
      id: 'id',
    }));

    app.configure(events);

    const userSettings = app.service('user-settings');

    userSettings
      .hooks(hooks)
      // Publish the events only to the userId that owns the document
      .publish(
        'patched',
        (data: UserSettings) => app
          .channel('authenticated')
          .filter(connection => connection.user.id === data.id)
      );
  };
}