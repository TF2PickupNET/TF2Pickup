// @flow

import { type GetBeforeHookContext } from '@feathersjs/feathers';
import { type App } from '@feathersjs/express';
import hooks from 'feathers-hooks-common';
import { Forbidden } from '@feathersjs/errors';
import { type UserSettings } from '@tf2pickup/types';

export default {
  before: {
    get(hook: GetBeforeHookContext<App, UserSettings>) {
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
    find: hooks.disallow(),
  },
};
