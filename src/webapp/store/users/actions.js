// @flow

import { type AsyncAction } from 'redux';
import { message } from 'antd';

import { type User } from '../../../types/User';
import app from '../../app';
import { regions } from '../../../config';

import { type State } from '..';

import roles from '../../../config/roles';

import {
  ADD_USER,
  UPDATE_USER,
  type UpdateUserAction,
  type AddUserAction,
} from './types';
import { makeGetUserById } from './selectors';

function updateUser(user: User): UpdateUserAction {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}

function addUser(user: User): AddUserAction {
  return {
    type: ADD_USER,
    payload: { user },
  };
}

const getUserById = makeGetUserById();

function fetchUser(userId: string, cb?: (err: Error | null) => void): AsyncAction<State> {
  return async (dispatch, getState) => {
    if (getUserById(getState(), userId) !== null) {
      return;
    }

    try {
      const user = await app.service('users').get(userId);

      dispatch(addUser(user));

      if (cb) {
        cb(null);
      }
    } catch (error) {
      console.error('Error while fetching a user', userId, error.message);

      if (cb) {
        cb(error);
      }
    }
  };
}

function updateRegion(region: $Keys<typeof regions>): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:change-region', { region }, (err) => {
      if (err) {
        message.error(`Couldn't change your region: ${err.message}`);
      } else {
        message.success(`Successfully changed your region to ${regions[region].fullName}`);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function setName(name: string): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:set-name', { name }, (err) => {
      if (err) {
        message.error(`Couldn't set your name: ${err.message}`);
      } else {
        message.success(`Successfully set your name to ${name}`);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function acceptRules(): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:accept-rules', {}, (err) => {
      if (err) {
        message.error(`Error while accepting rules: ${err.message}`);
      } else {
        message.success('Successfully accepted the rules');
      }

      return err ? reject(err) : resolve();
    });
  });
}

function completeSignUp(): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:complete-sign-up', {}, (err) => {
      if (err) {
        message.error(`Error while completing sign up: ${err.message}`);
      } else {
        message.success('Successfully completed sign up');
      }

      return err ? reject(err) : resolve();
    });
  });
}

function addRole(userId: string, role: $Keys<typeof roles>): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:add-role', {
      role,
      userId,
    }, (err) => {
      if (err) {
        message.error(`Error while adding role to user: ${err.message}`);
      } else {
        message.success(`Successfully added ${roles[role].display} to user`);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function removeRole(userId: string, role: $Keys<typeof roles>): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:remove-role', {
      role,
      userId,
    }, (err) => {
      if (err) {
        message.error(`Error while removing role to user: ${err.message}`);
      } else {
        message.success(`Successfully remove ${roles[role].display} from user`);
      }

      return err ? reject(err) : resolve();
    });
  });
}

export {
  completeSignUp,
  acceptRules,
  updateRegion,
  setName,
  updateUser,
  fetchUser,
  addUser,
  addRole,
  removeRole,
};
