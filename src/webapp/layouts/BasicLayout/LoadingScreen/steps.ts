import store, {State} from '../../../store';
import {fetchConfig} from '../../../store/config/actions';
import {fetchUser} from '../../../store/users/actions';
import {fetchSettings} from '../../../store/settings/actions';
import {fetchProfile} from '../../../store/user-profiles/actions';
import {getCurrentUserId} from '../../../store/user-id/selectors';
import {getConfigError, getConfigStatus} from '../../../store/config/selectors';
import {makeGetUserError, makeGetUserStatus} from '../../../store/users/selectors';
import {getSettingsError, getSettingsStatus} from "../../../store/settings/selectors";
import {AsyncStatus} from "../../../store/types";
import {makeGetProfileError, makeGetProfileStatus} from "../../../store/user-profiles/selectors";

const getUserStatus = makeGetUserStatus();
const getUserError = makeGetUserError();
const getProfileStatus = makeGetProfileStatus();
const getProfileError = makeGetProfileError();

const steps = {
  'load-configuration': {
    text: 'Loading configuration',
    end: 20,
    hasFinished: (state: State) => getConfigStatus(state) === AsyncStatus.SUCCESS,
    hasError: (state: State) => getConfigError(state),
    handler() {
      store.dispatch(fetchConfig());
    },
    next: 'load-user',
  },
  'load-user': {
    text: 'Loading user',
    end: 40,
    hasFinished: (state: State) => getUserStatus(state, getCurrentUserId(state)) === AsyncStatus.SUCCESS,
    hasError: (state: State) => getUserError(state, getCurrentUserId(state)),
    handler() {
      const userId = getCurrentUserId(store.getState());

      store.dispatch(fetchUser(userId));
    },
    next: 'load-settings',
  },
  'load-settings': {
    text: 'Loading settings',
    end: 60,
    hasFinished: (state: State) => getSettingsStatus(state) === AsyncStatus.SUCCESS,
    hasError: (state: State) => getSettingsError(state),
    handler() {
      store.dispatch(fetchSettings());
    },
    next: 'load-profile',
  },
  'load-profile': {
    text: 'Loading profile',
    end: 100,
    hasFinished: (state: State) => getProfileStatus(state, getCurrentUserId(state)) === AsyncStatus.SUCCESS,
    hasError: (state: State) => getProfileError(state, getCurrentUserId(state)),
    handler() {
      const userId = getCurrentUserId(store.getState());

      store.dispatch(fetchProfile(userId));
    },
    next: null,
  },
};

export default steps;
