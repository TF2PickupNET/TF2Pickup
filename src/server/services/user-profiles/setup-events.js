// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';

import { flattenObject } from '../../../utils/object';

import getUserData from './get-user-data';

const log = debug('TF2Pickup:user-profiles:events');

export default function setupEvents(app: App) {
  app.on('login', async (payload, { connection }) => {
    const userId = connection.user.id;

    try {
      const profile = await app.service('user-profiles').get(userId);
      const data = await getUserData(profile);

      await app.service('user-profiles').patch(userId, { $set: flattenObject(data) });
    } catch (error) {
      if (error.code !== 404) {
        log('Error in login callback', error);
      }
    }
  });
}
