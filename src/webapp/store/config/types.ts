import Config from '@typings/Configuration';
import {
  Action,
  AsyncItem,
} from '@webapp/store';

type State = AsyncItem<Config>;

enum ConfigActionTypes {
  START_FETCH = 'CONFIG/START-FETCH',
  FETCHED = 'CONFIG/FETCHED',
  FETCH_ERROR = 'CONFIG/FETCH_ERROR',
}

type Actions =
  | Action<typeof ConfigActionTypes.START_FETCH>
  | Action<typeof ConfigActionTypes.FETCHED, { config: Config }>
  | Action<typeof ConfigActionTypes.FETCH_ERROR, { error: Error }>;

export {
  State,
  Actions,
  ConfigActionTypes,
};
