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
    start: 0,
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
    start: 20,
    end: 40,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId !== null) {
          store.dispatch(
            fetchUser(userId, error => (error === null ? resolve() : reject(error))),
          );
        }

        reject(new Error('You are not logged in!'));
      });
    },
    next: 'load-settings',
  },
  'load-settings': {
    text: 'Loading settings',
    start: 40,
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
    start: 60,
    end: 80,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId !== null) {
          store.dispatch(
            fetchProfile(userId, error => (error === null ? resolve() : reject(error))),
          );
        }

        reject(new Error('You are not logged in!'));
      });
    },
    next: 'load-warnings',
  },
  'load-warnings': {
    text: 'Loading profile',
    start: 80,
    end: 100,
    handler() {
      // eslint-disable-next-line promise/avoid-new
      return new Promise<void>((resolve, reject) => {
        const userId = getCurrentUserId(store.getState());

        if (userId !== null) {
          store.dispatch(
            fetchWarningsForUser(userId, error => (error === null ? resolve() : reject(error))),
          );
        }

        reject(new Error('You are not logged in!'));
      });
    },
    next: null,
  },
};

export default steps;
