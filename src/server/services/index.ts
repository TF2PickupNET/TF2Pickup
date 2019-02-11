import { ServerApp } from '@feathersjs/feathers';

import users from './users';
import authentication from './authentication';
import userProfiles from './user-profiles';
import userSettings from './user-settings';
import configuration from './configuration';
import tf2Configs from './tf2-configs';
import logs from './logs';
import pickupPlayers from './pickup-players';

export default function services() {
  return (app: ServerApp) => {
    app
      .configure(users)
      .configure(userProfiles)
      .configure(userSettings)
      .configure(configuration)
      .configure(tf2Configs)
      .configure(authentication)
      .configure(logs)
      .configure(pickupPlayers);
  };
}
