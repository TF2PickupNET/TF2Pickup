import { ClientApp } from '@feathersjs/feathers';

import store from '..';
import { PickupQueueActionTypes } from './types';

export default function events() {
  return (app: ClientApp) => {
    app
      .service('pickup-queues')
      .on('patched', (queue) => {
        store.dispatch({
          type: PickupQueueActionTypes.UPDATE,
          payload: { queue },
        });
      });
  };
}
