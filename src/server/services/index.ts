import { ServerApp } from '@feathersjs/feathers';

import users from '@server/services//users';
import authentication from '@server/services//authentication';
import userProfiles from '@server/services//user-profiles';
import userSettings from '@server/services//user-settings';
import configuration from '@server/services//configuration';
import tf2Configs from '@server/services//tf2-configs';
import logs from '@server/services//logs';
import players from '@server/services/players';
import pickupQueues from '@server/services/queues';
import pickups from '@server/services/pickups';

export default function services(app: ServerApp) {
  app
    .configure(users)
    .configure(userProfiles)
    .configure(userSettings)
    .configure(configuration)
    .configure(tf2Configs)
    .configure(authentication)
    .configure(logs)
    .configure(players)
    .configure(pickupQueues)
    .configure(pickups);
}
