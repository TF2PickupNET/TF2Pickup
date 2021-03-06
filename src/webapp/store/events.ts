import { ClientApp } from '@feathersjs/feathers';

import settingsEvents from './settings/events';
import profileEvents from './user-profiles/events';
import usersEvents from './users/events';
import pickupQueuesEvents from './queues/events';
import pickupPlayerEvents from './players/events';
import connectionEvents from './connection/events';

export default function events() {
  return (app: ClientApp) => {
    app
      .configure(settingsEvents())
      .configure(profileEvents())
      .configure(usersEvents())
      .configure(pickupQueuesEvents())
      .configure(connectionEvents)
      .configure(pickupPlayerEvents);
  };
}
