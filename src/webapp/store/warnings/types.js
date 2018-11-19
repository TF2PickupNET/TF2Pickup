// @flow

import { type Action } from 'redux';

import { type Warning } from '../../../types/Warning';

type State = { [key: string]: Warning };

type AddWarningAction = Action<'WARNINGS/ADD', { warning: Warning }>;
type UpdateWarningAction = Action<'WARNINGS/UPDATE', { warning: Warning }>;
type Actions = AddWarningAction | UpdateWarningAction;

const ADD_WARNING = 'WARNINGS/ADD';
const UPDATE_WARNING = 'WARNINGS/UPDATE';

export type {
  State,
  Actions,
  UpdateWarningAction,
  AddWarningAction,
};

export {
  ADD_WARNING,
  UPDATE_WARNING,
};
