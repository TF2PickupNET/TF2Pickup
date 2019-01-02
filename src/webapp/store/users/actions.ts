import { AsyncAction } from 'redux';
// import { message } from 'antd';

import app from '../../app';
import regions from '../../../config/regions';

import { State } from '..';

import roles from '../../../config/roles';

import {
  FETCHED_USER,
  FETCH_FAILED,
  STARTED_FETCH_USER,
  Actions, UPDATE_USER,
} from './types';
import {makeGetUserStatus} from './selectors';
import User from "../../../types/User";
import {AsyncStatus} from "../types";

const getUserStatus = makeGetUserStatus();

function updateUser(user: User): Actions {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}

function fetchUser(userId: string | null): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    if (userId === null || getUserStatus(getState(), userId) !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: STARTED_FETCH_USER,
      payload: { userId },
    });

    try {
      const user = await app.service('users').get(userId);

      dispatch({
        type: FETCHED_USER,
        payload: { user },
      });
    } catch (error) {
      console.error('Error while fetching a user', userId, error.message);

      dispatch({
        type: FETCH_FAILED,
        payload: {
          error,
          userId,
        },
      });
    }
  };
}

function updateRegion(region: keyof typeof regions): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:change-region', { region }, (err) => {
      if (err) {
        // message.error(`Couldn't change your region: ${err.message}`, 2);
      } else {
        // message.success(`Successfully changed your region to ${regions[region].fullName}`, 1);
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
        // message.error(`Couldn't set your name: ${err.message}`, 2);
      } else {
        // message.success(`Successfully set your name to ${name}`, 1);
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
        // message.error(`Error while accepting rules: ${err.message}`, 2);
      } else {
        // message.success('Successfully accepted the rules', 1);
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
        // message.error(`Error while completing sign up: ${err.message}`, 2);
      } else {
        // message.success('Successfully completed sign up', 1);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function addRole(userId: string, role: keyof typeof roles): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:add-role', {
      role,
      userId,
    }, (err) => {
      if (err) {
        // message.error(`Error while adding role: ${err.message}`, 2);
      } else {
        // message.success(`Successfully added ${roles[role].display}`, 1);
      }

      return err ? reject(err) : resolve();
    });
  });
}

function removeRole(userId: string, role: keyof typeof roles): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit('users:remove-role', {
      role,
      userId,
    }, (err) => {
      if (err) {
        // message.error(`Error while removing role: ${err.message}`, 2);
      } else {
        // message.success(`Successfully remove ${roles[role].display}`, 1);
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
  addRole,
  removeRole,
};
