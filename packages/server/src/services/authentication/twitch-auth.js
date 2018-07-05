// @flow

import auth from '@feathersjs/authentication';
import oauth2 from '@feathersjs/authentication-oauth2';
import { Strategy } from 'passport-twitch';
import { type App } from '@feathersjs/express';
import config from 'config';

import {
  redirectOnSuccess,
  setUrlCookie,
} from './middlewares';

export default function twitchAuth(app: App) {
  app.configure(oauth2({
    Strategy,
    name: 'twitch',
    clientID: config.get('services.twitch.clientId'),
    clientSecret: config.get('services.twitch.clientSecret'),
    scope: ['public_profile'],
    handler(req, res, next) {
      console.log(req);
      next();
    }
  }));

  app
    .use(
      '/auth/twitch',
      setUrlCookie,
      (req, res, next) => {
        console.log(req);
      },
      auth.express.authenticate('twitch'),
    )
    .use(
      '/auth/twitch/callback',
      auth.express.authenticate('twitch'),
      redirectOnSuccess,
    );
}
