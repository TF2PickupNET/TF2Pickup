// @flow

import { type App } from '@feathersjs/express';
import SteamStrategy from 'passport-steam';
import config from 'config';
import auth from '@feathersjs/authentication';

import {
  createJWT,
  setUrlCookie,
} from '../middlewares';

import createValidator from './create-validator';

export default function steam(app: App) {
  app.passport.use(new SteamStrategy({
    returnURL: `${config.get('server.url')}/auth/steam/callback`,
    realm: config.get('server.url'),
    profile: false,
  }, createValidator(app)));

  app
    .use('/auth/steam', setUrlCookie, auth.express.authenticate('steam'))
    .use('/auth/steam/callback', auth.express.authenticate('steam'), createJWT);
}
