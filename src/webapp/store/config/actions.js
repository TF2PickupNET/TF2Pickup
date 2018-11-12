// @flow

import { type AsyncAction } from 'redux';

import { type State } from '..';

import { message } from 'antd';

import app from '../../app';

import { SET_CONFIG } from './types';

export function fetchConfig(cb?: (error: Error | null) => void): AsyncAction<State> {
  return async (dispatch) => {
    try {
      const config = await app.service('configuration').get('config');

      dispatch({
        type: SET_CONFIG,
        payload: { config },
      });

      if (cb) {
        cb(null);
      }
    } catch (error) {
      message.error(`Error while fetching the configuration: ${error.message}`);

      if (cb) {
        cb(error);
      }
    }
  };
}
