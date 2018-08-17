// @flow

import {
  type GetBeforeHookContext,
  type CreateBeforeHookContext,
} from '@feathersjs/feathers';
import hooks from 'feathers-hooks-common';
import { Forbidden } from '@feathersjs/errors';

import { type UserProfile } from '../../../types';

import getUserData from './get-user-data';

export default {
  before: {
    find: hooks.disallow(),
    remove: hooks.disallow(),
    get(hook: GetBeforeHookContext<UserProfile>) {
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
    async create(hook: CreateBeforeHookContext<UserProfile>) {
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
