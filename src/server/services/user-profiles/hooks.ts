import { CreateBeforeHookContext } from '@feathersjs/feathers';
import hooks from 'feathers-hooks-common';
import UserProfile from '@typings/UserProfile';

import getUserData from './get-user-data';

export default {
  before: {
    find: hooks.disallow(),
    remove: hooks.disallow(),
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
