import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import getUserData from './get-user-data';

const log = debug('TF2Pickup:user-profiles:events');

export default function setupEvents(app: ServerApp) {
  app.on('login', async (_, { connection }) => {
    const userId = connection.user.id;

    try {
      const profile = await app.service('user-profiles').get(userId);
      const data = await getUserData(profile);

      await app.service('user-profiles').patch(userId, data);
    } catch (error) {
      log('Error in login callback', error);
    }
  });
}
