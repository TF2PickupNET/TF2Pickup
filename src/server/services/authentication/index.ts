import {
  ServerApp,
  CreateBeforeHookContext,
} from '@feathersjs/feathers';
import auth, { AuthPayload } from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import debug from 'debug';
import config from 'config';

import JWTVerifier from './JWTVerifier';
import steam from './steam';

const log = debug('TF2Pickup:authentication');
const options = {
  secret: config.get<string>('auth.secret'),
  jwt: {
    expiresIn: '7d',
    issuer: 'tf2pickup',
    audience: config.get<string>('server.url'),
  },
};

const hooks = {
  before: {
    create: auth.hooks.authenticate<AuthPayload, CreateBeforeHookContext<AuthPayload>>(['jwt']),
  },
};

export { options };

export default function authentication(app: ServerApp) {
  log('Setting up authentication service');

  app
    .configure(auth(options))
    .configure(jwt({ Verifier: JWTVerifier }))
    .configure(steam())
    .service('authentication')
    .hooks(hooks);
}
