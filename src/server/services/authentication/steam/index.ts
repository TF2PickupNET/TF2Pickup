import { ServerApp } from '@feathersjs/feathers';
import SteamStrategy from 'passport-steam';
import config from 'config';
import auth from '@feathersjs/authentication';

import {
  handleSuccessfulAuthentication,
  setUrlCookie,
} from '../middlewares';

import createValidator from './create-validator';

export default function steam() {
  return (app: ServerApp) => {
    app.passport.use(
      new SteamStrategy({
        returnURL: `${config.get<string>('server.url')}/auth/steam/callback`,
        realm: config.get('server.url'),
        profile: false,
      }, createValidator(app)),
    );

    app
      .use(
        '/auth/steam',
        setUrlCookie,
        auth.express.authenticate('steam'),
      )
      .use(
        '/auth/steam/callback',
        auth.express.authenticate('steam'),
        handleSuccessfulAuthentication,
      );
  };
}
