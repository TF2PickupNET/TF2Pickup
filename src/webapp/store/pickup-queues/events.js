// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateQueue } from './actions';

export function events() {
  return (app: ClientApp) => {
    const pickupQueues = app.service('pickup-queues');

    pickupQueues.on('patched', (queue) => {
      store.dispatch(updateQueue(queue));
    });
  };
}

export default events;
