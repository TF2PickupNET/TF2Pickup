// @flow

import store from '../../../store';
import { fetchConfig } from '../../../store/config/actions';
import { authenticate } from '../../../store/user-id/actions';
import { fetchUser } from '../../../store/users/actions';
import { fetchSettings } from '../../../store/settings/actions';
import { fetchProfile } from '../../../store/user-profiles/actions';

type Props = {
  config: boolean,
  userId: string | null,
  user: boolean,
  settings: boolean,
  profile: boolean,
};

const steps = {
  'load-configuration': {
    text: 'Loading configuration',
    start: 10,
    end: 30,
    handler() {
      store.dispatch(fetchConfig());
    },
    isFinished: (props: Props) => props.config !== null,
    next: 'authenticate',
  },
  authenticate: {
    text: 'Loading configuration',
    start: 30,
    end: 50,
    handler() {
      authenticate();
    },
    isFinished: (props: Props) => props.userId !== null,
    next: 'load-user',
  },
  'load-user': {
    text: 'Loading user',
    start: 50,
    end: 70,
    handler(props: Props) {
      if (props.userId !== null) {
        store.dispatch(fetchUser(props.userId));
      }
    },
    isFinished: (props: Props) => props.user,
    next: 'load-settings',
  },
  'load-settings': {
    text: 'Loading settings',
    start: 70,
    end: 85,
    handler(props: Props) {
      if (props.userId !== null) {
        store.dispatch(fetchSettings());
      }
    },
    isFinished: (props: Props) => props.settings,
    next: 'load-profile',
  },
  'load-profile': {
    text: 'Loading profile',
    start: 85,
    end: 100,
    handler(props: Props) {
      if (props.userId !== null) {
        store.dispatch(fetchProfile(props.userId));
      }
    },
    isFinished: (props: Props) => props.profile,
    next: null,
  },
};

export default steps;
