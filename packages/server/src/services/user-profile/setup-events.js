// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';

import getUserData from './get-user-data';

const log = debug('TF2Pickup:user-profile:events');

export default function setupEvents(app: App) {
  app.on('login', async (payload, { connection }) => {
    const userId = connection.user.id;

    try {
      const profile = await app.service('user-profile').get(userId);
      const updatedData = await getUserData(profile);

      await app.service('user-profiles').patch(userId, { ...updatedData });
    } catch (error) {
      log('Error in login callback', error);
    }
  });
}
