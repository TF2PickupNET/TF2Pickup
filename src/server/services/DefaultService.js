// @flow

import { NotImplemented } from '@feathersjs/errors';
import {
  type ServiceDefinition,
  type ServerApp,
} from '@feathersjs/feathers';

export default class DefaultService implements ServiceDefinition<{}> {
  app: ServerApp;

  setup(app: ServerApp) {
    this.app = app;
  }

  // eslint-disable-next-line class-methods-use-this
  find() {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line class-methods-use-this
  get() {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line class-methods-use-this
  patch() {
    return Promise.reject(new NotImplemented());
  }

  // eslint-disable-next-line class-methods-use-this
  remove() {
    return Promise.reject(new NotImplemented());
  }
}
