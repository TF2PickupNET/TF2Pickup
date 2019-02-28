import { Action as ReduxAction } from 'redux';
import Actions from '@webapp/store/actions';

import { State } from '.';

interface Action<
  Type extends string,
  Payload extends object | null = null
> extends ReduxAction<Type> {
  payload: Payload,
}

type AsyncAction = (
  dispatch: <A extends Actions | AsyncAction>(action: A) => A,
  getState: () => State,
) => Promise<void> | void;

const enum AsyncStatus {
  NOT_STARTED = 'NOT-STARTED',
  LOADING = 'LOADING',
  FETCHED = 'FETCHED',
  ERROR = 'ERROR',
}

type AsyncItem<Item> =
 | { status: AsyncStatus.LOADING, item: null, error: null }
 | { status: AsyncStatus.FETCHED, item: Item, error: null }
 | { status: AsyncStatus.ERROR, item: null, error: Error }
 | { status: AsyncStatus.NOT_STARTED, item: null, error: null };

export {
  AsyncItem,
  AsyncStatus,
  Action,
  AsyncAction,
};
