// @flow

import { type App } from '@feathersjs/express';

import users from './users';
import authentication from './authentication';
import userProfiles from './user-profiles';
import userSettings from './user-settings';
import configuration from './configuration';
import tf2Configs from './tf2-configs';
import logs from './logs';

export default function services(app: App) {
  app
    .configure(users)
    .configure(userProfiles)
    .configure(userSettings)
    .configure(configuration)
    .configure(tf2Configs)
    .configure(authentication)
    .configure(logs);
}
