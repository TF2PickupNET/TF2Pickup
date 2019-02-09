import { ClientApp } from '@feathersjs/feathers';
import store from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';

import { SettingsActionTypes } from './types';

export function events() {
  return (app: ClientApp) => {
    app
      .service('user-settings')
      .on('patched', (settings) => {
        const userId = getCurrentUserId(store.getState());

        if (settings.id === userId) {
          store.dispatch({
            type: SettingsActionTypes.UPDATE,
            payload: { settings },
          });
        }
      });
  };
}

export default events;
