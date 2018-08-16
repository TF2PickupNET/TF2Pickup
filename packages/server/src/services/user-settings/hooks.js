// @flow

import { type GetBeforeHookContext } from '@feathersjs/feathers';
import hooks from 'feathers-hooks-common';
import { Forbidden } from '@feathersjs/errors';
import { type UserSettings } from '@tf2pickup/types';

export default {
  before: {
    get(hook: GetBeforeHookContext<UserSettings>) {
      if (!hook.params.provider) {
        return hook;
      }

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
