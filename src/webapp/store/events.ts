import { ClientApp } from '@feathersjs/feathers';

import settingsEvents from './settings/events';
import profileEvents from './user-profiles/events';
import usersEvents from './users/events';
import pickupQueuesEvents from './pickup-queues/events';
import connectionEvents from './connection/events';

export default function events() {
  return (app: ClientApp) => {
    app
      .configure(settingsEvents())
      .configure(profileEvents())
      .configure(usersEvents())
      .configure(pickupQueuesEvents())
      .configure(connectionEvents);
  };
}
