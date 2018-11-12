// @flow

import { type ClientApp } from '@feathersjs/feathers';

import settingsEvents from './settings/events';
import profileEvents from './user-profiles/events';
import usersEvents from './users/events';
import messagesEvents from './messages/events';
import warningEvents from './warnings/events';

export default function events() {
  return (app: ClientApp) => {
    app
      .configure(settingsEvents())
      .configure(profileEvents())
      .configure(usersEvents())
      .configure(messagesEvents())
      .configure(warningEvents());
  };
}
