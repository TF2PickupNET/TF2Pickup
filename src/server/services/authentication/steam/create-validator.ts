import debug from 'debug';
import { BadRequest } from '@feathersjs/errors';
import { ServerApp } from '@feathersjs/feathers';

import User from '@typings/User';

type Done = (error: Error | null, user: User | null) => void;

const log = debug('TF2Pickup:auth:steam:validator');

function createNewUser(app: ServerApp, userId: string) {
  log('Creating new user because no user was found', { userId });

  return app.service('users').create({
    id: userId,
    name: null,
    region: null,
    online: true,
    lastOnline: Date.now(),
    hasAcceptedTheRules: false,
    createdOn: Date.now(),
    lastPickup: null,
    roles: [],
    hasCompletedSignUp: false,
  });
}

export default function createValidator(app: ServerApp) {
  return async (identifier: string, _: {}, done: Done) => {
    const match = identifier.match(/https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
    const id = match ? match[1] : null;

    if (id === null) {
      return done(new BadRequest(), null);
    }

    log('New steam login with id', { userId: id });

    const users = app.service('users');

    try {
      const user = await users.get(id);

      log('Found user for steam login request', { userId: id });

      return done(null, user);
    } catch (error) {
      if (error.code !== 404) {
        log('Unknown error while getting user', {
          userId: id,
          error,
        });

        return done(error, null);
      }
    }

    // Create a new userId when no userId was found
    try {
      const newUser = await createNewUser(app, id);

      return done(null, newUser);
    } catch (error) {
      log('Error while creating new user', {
        userId: id,
        error,
      });

      return done(error, null);
    }
  };
}

