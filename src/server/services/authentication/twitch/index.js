// @flow

import auth from '@feathersjs/authentication';
import { NotAuthenticated } from '@feathersjs/errors';
import oauth2 from '@feathersjs/authentication-oauth2';
import { type App } from '@feathersjs/express';
import config from 'config';

import TwitchStrategy from './TwitchStrategy';
import TwitchVerifier from './TwitchVerifier';

export default function twitch(app: App) {
  app.configure(oauth2({
    Strategy: TwitchStrategy,
    name: 'twitch',
    callbackURL: `${config.get('server.url')}/auth/twitch/callback`,
    clientID: config.get('services.twitch.clientId'),
    clientSecret: config.get('services.twitch.clientSecret'),
    passReqToCallback: true,
    Verifier: TwitchVerifier,
  }));

  app
    .use(
      '/auth/twitch',
      (req, res, next) => {
        if (!req.user) {
          throw new NotAuthenticated();
        }

        next();
      },
      auth.express.authenticate('twitch'),
    )
    .use(
      '/auth/twitch/callback',
      auth.express.authenticate('twitch'),
    );
}
