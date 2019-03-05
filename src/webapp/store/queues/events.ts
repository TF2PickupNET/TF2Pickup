import { ClientApp } from '@feathersjs/feathers';
import store from '@webapp/store';

import { QueueActionTypes } from './types';

export default function events() {
  return (app: ClientApp) => {
    app
      .service('queues')
      .on('patched', (queue) => {
        store.dispatch({
          type: QueueActionTypes.UPDATE,
          payload: { queue },
        });
      });
  };
}
