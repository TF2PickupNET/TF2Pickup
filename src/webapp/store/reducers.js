// @flow

import {
  combineReducers,
  type Reducer,
  type Action,
} from 'redux';

import userId from './user-id/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import userProfiles from './user-profiles/reducer';
import users from './users/reducer';

type ExtractState = <R, A>((state: R, action: A) => R) => R;
type State = {|
  userId: $Call<ExtractState, typeof userId>,
  config: $Call<ExtractState, typeof config>,
  settings: $Call<ExtractState, typeof settings>,
  userProfiles: $Call<ExtractState, typeof userProfiles>,
  users: $Call<ExtractState, typeof users>,
|};
type Reducers = $ObjMap<State, <S, A: Action<>>(arg: S) => Reducer<S, A>>;

const reducers: Reducers = {
  users,
  userId,
  config,
  settings,
  userProfiles,
};

export type { State };

export default combineReducers(reducers);
