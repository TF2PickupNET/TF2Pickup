// @flow

import debug from 'debug';
import { type App } from '@feathersjs/express';

import { type User } from '../../../../types/user';

type Done = (error: Error | null, user: User | null) => void;

const log = debug('TF2Pickup:auth:steam:validator');

/**
 * Get a userId by an id. Returns null when no userId was found.
 * Otherwise returns an array of arguments for the done function.
 * It ignores 404 errors because the userId might not yet exist.
 */
async function getUser(users, id) {
  if (id !== null) {
    try {
      // Try finding a already created userId first
      const user = await users.get(id);

      return [null, user];
    } catch (error) {
      // Ignore error code 404 which means no userId was found, so we need to create one
      if (error.code !== 404) {
        log('Unknown error while getting userId', id, error);

        return [error, null];
      }
    }
  }

  return null;
}

export default function createValidator(app: App) {
  return async (identifier: string, profile: {}, done: Done) => {
    const match = identifier.match(/https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
    const id = match ? match[1] : null;

    log('New steam login with id', id);

    const users = app.service('users');
    const user = await getUser(users, match);

    // We found a userId or an error occurred other than 404
    if (user !== null) {
      return done(...user);
    }

    // Create a new userId when no userId was found
    try {
      const newUser = await users.create({ id });

      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  };
}

