// @flow

import { type ClientApp } from '@feathersjs/feathers';

import userIdEvents from './user-id/events';
import settingsEvents from './settings/events';
import profileEvents from './user-profiles/events';
import usersEvents from './users/events';
import messagesEvents from './messages/events';

export default function events() {
  return (app: ClientApp) => {
    app
      .configure(userIdEvents())
      .configure(settingsEvents())
      .configure(profileEvents())
      .configure(usersEvents())
      .configure(messagesEvents());
  };
}
