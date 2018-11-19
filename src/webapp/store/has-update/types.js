// @flow

import { type Action } from 'redux';

type State = boolean;
type SetHasUpdateAction = Action<'HAS-UPDATE/SET', { hasUpdate: boolean }>;
type Actions = SetHasUpdateAction;

const SET_HAS_UPDATE = 'HAS-UPDATE/SET';

export type {
  SetHasUpdateAction,
  Actions,
  State,
};

export { SET_HAS_UPDATE };
