// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import playSound from '../../utils/play-sound';

import {
  addWarning,
  updateWarning,
} from './actions';

export default function events() {
  return (app: ClientApp) => {
    app
      .service('warnings')
      .on('patched', (warning) => {
        store.dispatch(updateWarning(warning));
      })
      .on('created', (warning) => {
        store.dispatch(addWarning(warning));
      });
  };
}
