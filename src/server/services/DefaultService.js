// @flow

import { NotImplemented } from '@feathersjs/errors';
import {
  type ServiceDefinition,
  type ServerApp,
  type Params,
} from '@feathersjs/feathers';

export default class DefaultService implements ServiceDefinition<{}> {
  app: ServerApp;

  path: string;

  setup(app: ServerApp, path: string) {
    this.app = app;
    this.path = path;
  }

  // eslint-disable-next-line no-unused-vars
  find(params: Params<>) {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line no-unused-vars
  get(id: string, params: Params<>) {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line no-unused-vars
  create(data: {}, params: Params<>) {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line no-unused-vars
  update(id: string, data: {}, params: Params<>) {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line no-unused-vars
  patch(id: string, data: {}, params: Params<>) {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line no-unused-vars
  remove(id: string, params: Params<>) {
    return Promise.reject(new NotImplemented());
  }
}
