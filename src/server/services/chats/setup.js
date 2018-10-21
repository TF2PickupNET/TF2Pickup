// @flow

import { type ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import { regions } from '../../../config';

const log = debug('TF2Pickup:chats:setup');

async function makeSureChatExists(chats, id) {
  try {
    return await chats.get(id);
  } catch (error) {
    if (error.code === 404) {
      return chats.create({ id });
    }

    log('Unknown error while setting up chats');

    return null;
  }
}

export default function setup(app: ServerApp) {
  const chats = app.service('chats');

  makeSureChatExists(chats, 'global');

  Object.keys(regions).forEach((region) => {
    makeSureChatExists(chats, region);
  });
}
