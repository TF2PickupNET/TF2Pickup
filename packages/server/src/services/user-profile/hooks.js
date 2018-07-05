// @flow

import {
  type GetBeforeHookContext,
  type CreateBeforeHookContext,
} from '@feathersjs/feathers';
import { type App } from '@feathersjs/express';
import hooks from 'feathers-hooks-common';
import { Forbidden } from '@feathersjs/errors';
import { type UserProfile } from '@tf2pickup/types';

import getUserData from './get-user-data';

export default {
  before: {
    get(hook: GetBeforeHookContext<App, UserProfile>) {
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
    async create(hook: CreateBeforeHookContext<App, UserProfile>) {
      const data = await getUserData(hook.data);

      return {
        ...hook,
        data: {
          ...hook.data,
          ...data,
        },
      };
    },
  },
};
