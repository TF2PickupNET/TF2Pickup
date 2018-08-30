// @flow

import { type GetBeforeHookContext } from '@feathersjs/feathers';
import hooks from 'feathers-hooks-common';
import { Forbidden } from '@feathersjs/errors';

import { type UserSettings } from '../../../types/user-settings';

export default {
  before: {
    get(hook: GetBeforeHookContext<UserSettings>) {
      // For server side request provider is undefined
      if (!hook.params.provider) {
        return hook;
      }

      // When we have a userId, we explicitly override the id passed by the requests
      if (hook.params.user) {
        return {
          ...hook,
          id: hook.params.user.id,
        };
      }

      throw new Forbidden();
    },
    remove: hooks.disallow(),
    find: hooks.disallow(),
  },
};
