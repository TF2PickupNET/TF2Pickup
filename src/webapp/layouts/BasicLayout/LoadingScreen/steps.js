// @flow

import store from '../../../store';
import { fetchConfig } from '../../../store/config/actions';
import { fetchUser } from '../../../store/users/actions';
import { fetchSettings } from '../../../store/settings/actions';
import { fetchProfile } from '../../../store/user-profiles/actions';
import { fetchWarningsForUser } from '../../../store/warnings/actions';
import { getCurrentUserId } from '../../../store/user-id/selectors';

const steps = {
  'load-configuration': {
    text: 'Loading configuration',
    end: 20,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        store.dispatch(
          fetchConfig(error => (error === null ? resolve() : reject(error)))
        );
      });
    },
    next: 'load-user',
  },
  'load-user': {
    text: 'Loading user',
    end: 40,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId === null) {
          reject(new Error('You are not logged in!'));
        } else {
          store.dispatch(
            fetchUser(userId, error => (error === null ? resolve() : reject(error))),
          );
        }
      });
    },
    next: 'load-settings',
  },
  'load-settings': {
    text: 'Loading settings',
    end: 60,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        store.dispatch(
          fetchSettings(error => (error === null ? resolve() : reject(error))),
        );
      });
    },
    next: 'load-profile',
  },
  'load-profile': {
    text: 'Loading profile',
    end: 80,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId === null) {
          reject(new Error('You are not logged in!'));
        } else {
          store.dispatch(
            fetchProfile(userId, error => (error === null ? resolve() : reject(error))),
          );
        }
      });
    },
    next: 'load-warnings',
  },
  'load-warnings': {
    text: 'Loading warnings',
    end: 100,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId === null) {
          reject(new Error('You are not logged in!'));
        } else {
          store.dispatch(
            fetchWarningsForUser(userId, error => (error === null ? resolve() : reject(error))),
          );
        }
      });
    },
    next: null,
  },
};

export default steps;
