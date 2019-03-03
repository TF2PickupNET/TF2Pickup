import {
  AsyncItem,
  AsyncStatus,
} from '@webapp/store/types';

function createTypedAsyncItem<Item>() {
  return {
    createLoadingState(): AsyncItem<Item> {
      return {
        status: AsyncStatus.LOADING,
        item: null,
        error: null,
      };
    },
    createNotStartedState(): AsyncItem<Item> {
      return {
        status: AsyncStatus.NOT_STARTED,
        item: null,
        error: null,
      };
    },
    createFetchedState(item: Item): AsyncItem<Item> {
      return {
        status: AsyncStatus.FETCHED,
        item,
        error: null,
      };
    },
    createErrorState(error: Error): AsyncItem<Item> {
      return {
        status: AsyncStatus.ERROR,
        item: null,
        error,
      };
    },
  };
}

export { createTypedAsyncItem };
