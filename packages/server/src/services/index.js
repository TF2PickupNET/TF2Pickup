// @flow

import { type App } from '@feathersjs/express';

import users from './users';
import authentication from './authentication';
import userProfiles from './user-profile';
import userSettings from './user-settings';
import configuration from './configuration';

export default function services(app: App) {
  app
    .configure(users)
    .configure(userProfiles)
    .configure(userSettings)
    .configure(configuration)
    .configure(authentication);
}
