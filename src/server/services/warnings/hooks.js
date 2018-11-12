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
    find(hook: FindBeforeHookContext<Warning>) {
      if (!isString(hook.params.query.for)) {
        throw new BadRequest();
      }

      if (!hook.params.user) {
        throw new NotAuthenticated();
      }

      if (hook.params.user.id === hook.params.query.for) {
        return hook;
      }

      if (hasPermission('warnings.see', hook.params.user)) {
        return hook;
      }

      throw new Forbidden();
    },

    remove: hooks.disallow(),
    get: hooks.disallow('external'),
  },
};
