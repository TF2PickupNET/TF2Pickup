// @flow

import { type AsyncAction } from 'redux';
import { message as Message } from 'antd';

import app from '../../app';

import { type State } from '..';

import { makeGetUserById } from '../users/selectors';
import { getCurrentUser } from '../user-id/selectors';
import { hasPermission } from '../../../utils/has-permission';
import { type Warning } from '../../../types/Warning';

import {
  ADD_WARNING,
  UPDATE_WARNING,
  type AddWarningAction,
  type UpdateWarningAction,
} from './types';

function addWarning(warning: Warning): AddWarningAction {
  return {
    type: ADD_WARNING,
    payload: { warning },
  };
}

function updateWarning(warning: Warning): UpdateWarningAction {
  return {
    type: UPDATE_WARNING,
    payload: { warning },
  };
}

function markWarningAsRead(id: string): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('warnings:mark-as-read', { id }, (err) => {
      if (err) {
        Message.error(`Error while marking warning as read: ${err.message}`);
      } else {
        Message.success('Successfully marked warning as read');
      }

      return err ? reject(err) : resolve();
    });
  });
}

function createWarning(userId: string, message: string): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('warnings:create', {
      message,
      for: userId,
    }, (err) => {
      if (err) {
        Message.error(`Error while marking warning as read: ${err.message}`);
      } else {
        Message.success('Successfully marked warning as read');
      }

      return err ? reject(err) : resolve();
    });
  });
}

function fetchWarningsForUser(
  userId: string,
  cb?: (error: Error | null) => void,
): AsyncAction<State> {
  return async (dispatch, getState) => {
    const state = getState();
    const user = makeGetUserById()(state, userId);
    const currentUser = getCurrentUser(state);

    if (currentUser === null) {
      return cb && cb(new Error('You are not logged in'));
    }

    if (!hasPermission('warnings.see', currentUser, user)) {
      return cb && cb(new Error(`You don't have the permission to see the warnings for ${userId}`));
    }

    try {
      const warnings = await app.service('warnings').find({ query: { for: userId } });

      warnings.forEach((warning) => {
        dispatch(addWarning(warning));
      });

      return cb && cb(null);
    } catch (error) {
      Message.error(`Error while fetching warnings for user ${userId}: ${error.message}`);

      return cb && cb(error);
    }
  };
}

export {
  addWarning,
  updateWarning,
  fetchWarningsForUser,
  markWarningAsRead,
  createWarning,
};
