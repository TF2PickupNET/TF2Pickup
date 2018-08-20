// @flow

import { type App } from '@feathersjs/feathers';

import userEvents from './user/events';
import settingsEvents from './settings/events';
import profileEvents from './profile/events';

export default function events() {
  return (app: App) => {
    app
      .configure(userEvents)
      .configure(settingsEvents)
      .configure(profileEvents);
  };
}
