// @flow

import { type Dispatch } from 'redux';
import { type ClientApp } from '@feathersjs/feathers';

import { type State } from '..';

import {
  SET_CONFIG,
  type Actions,
} from './types';

export function fetchConfig() {
  return async (
    dispatch: Dispatch<Actions>,
    getState: () => State,
    app: ClientApp,
  ) => {
    const config = await app.service('configuration').get('config');

    dispatch({
      type: SET_CONFIG,
      payload: { config },
    });
  };
}
