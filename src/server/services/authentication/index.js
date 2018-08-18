// @flow

import { type App } from '@feathersjs/express';
import auth from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import debug from 'debug';
import config from 'config';

import JWTVerifier from './JWTVerifier';
import steam from './steam';
import twitch from './twitch';

const log = debug('TF2Pickup:authentication');
const options = {
  secret: config.get('auth.secret'),
  cookie: {
    enabled: true,
    name: 'feathers-jwt',
  },
  jwt: {
    expiresIn: '7d',
    issuer: 'tf2pickup',
    audience: config.get('server.url'),
  },
};

export { options };

export default function authentication(app: App) {
  log('Setting up authentication service');

  app
    .configure(auth(options))
    .configure(jwt({ Verifier: JWTVerifier }))
    .configure(steam)
    .configure(twitch)
    .service('authentication')
    .hooks({ before: { create: auth.hooks.authenticate(['jwt']) } });
}
