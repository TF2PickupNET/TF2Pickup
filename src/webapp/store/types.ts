const enum AsyncStatus {
  NOT_STARTED = 'NOT-STARTED',
  LOADING = 'LOADING',
  FETCHED = 'FETCHED',
  ERROR = 'ERROR',
}

type AsyncItem<Item> =
   { status: AsyncStatus.LOADING, item: null, error: null }
 | { status: AsyncStatus.FETCHED, item: Item, error: null }
 | { status: AsyncStatus.ERROR, item: null, error: Error }
 | { status: AsyncStatus.NOT_STARTED, item: null, error: null };

function createStateCreator<Item>() {
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

export {
  createStateCreator,
  AsyncItem,
  AsyncStatus,
};
