import store, { State } from '../../../store';
import { fetchConfig } from '../../../store/config/actions';
import { fetchUser } from '../../../store/users/actions';
import { fetchSettings } from '../../../store/settings/actions';
import { fetchProfile } from '../../../store/user-profiles/actions';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import {
  getConfigError,
  getConfigStatus,
} from '../../../store/config/selectors';
import {
  makeGetUserStatusById,
  makeGetUserErrorById,
} from '../../../store/users/selectors';
import {
  getSettingsError,
  getSettingsStatus,
} from '../../../store/settings/selectors';
import { AsyncStatus } from '../../../store/types';
import {
  makeGetProfileStatusById,
  makeGetProfileErrorById,
} from '../../../store/user-profiles/selectors';

const getUserStatus = makeGetUserStatusById();
const getUserError = makeGetUserErrorById();
const getProfileStatus = makeGetProfileStatusById();
const getProfileError = makeGetProfileErrorById();

const steps = {
  'load-configuration': {
    text: 'Loading configuration',
    end: 20,
    hasFinished(state: State) {
      return getConfigStatus(state) === AsyncStatus.SUCCESS;
    },
    hasError(state: State) {
      return getConfigError(state);
    },
    handler() {
      store.dispatch(fetchConfig());
    },
    next: 'load-user',
  },
  'load-user': {
    text: 'Loading user',
    end: 40,
    hasFinished(state: State) {
      return getUserStatus(state, getCurrentUserId(state)) === AsyncStatus.SUCCESS;
    },
    hasError(state: State) {
      return getUserError(state, getCurrentUserId(state));
    },
    handler() {
      const userId = getCurrentUserId(store.getState());

      store.dispatch(fetchUser(userId));
    },
    next: 'load-settings',
  },
  'load-settings': {
    text: 'Loading settings',
    end: 60,
    hasFinished(state: State) {
      return getSettingsStatus(state) === AsyncStatus.SUCCESS;
    },
    hasError(state: State) {
      return getSettingsError(state);
    },
    handler() {
      store.dispatch(fetchSettings());
    },
    next: 'load-profile',
  },
  'load-profile': {
    text: 'Loading profile',
    end: 100,
    hasFinished(state: State) {
      return getProfileStatus(state, getCurrentUserId(state)) === AsyncStatus.SUCCESS;
    },
    hasError(state: State) {
      return getProfileError(state, getCurrentUserId(state));
    },
    handler() {
      const userId = getCurrentUserId(store.getState());

      store.dispatch(fetchProfile(userId));
    },
    next: null,
  },
};

export default steps;
