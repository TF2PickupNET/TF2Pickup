// @flow

import { type FindBeforeHookContext } from '@feathersjs/feathers';
import hooks from 'feathers-hooks-common';
import {
  BadRequest,
  NotAuthenticated,
  Forbidden,
} from '@feathersjs/errors';

import { isString } from '../../../utils/string';
import { hasPermission } from '../../../utils/has-permission';
import { type Warning } from '../../../types/Warning';

export default {
  before: {
    async find(hook: FindBeforeHookContext<Warning>) {
      const {
        user: currentUser,
        query,
      } = hook.params;

      if (!isString(query.for)) {
        throw new BadRequest();
      }

      if (!currentUser) {
        throw new NotAuthenticated();
      }

      const user = await hook.app.service('users').get(query.for);

      if (hasPermission('warnings.see', currentUser, user)) {
        return hook;
      }

      throw new Forbidden();
    },

    remove: hooks.disallow(),
    get: hooks.disallow('external'),
  },
};
