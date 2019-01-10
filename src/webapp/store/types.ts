const enum AsyncStatus {
  NOT_STARTED = 'NOT-STARTED',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type AsyncItem<Item> =
   { status: AsyncStatus.LOADING, item: null, error: null }
 | { status: AsyncStatus.SUCCESS, item: Item, error: null }
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
        status: AsyncStatus.LOADING,
        item: null,
        error: null,
      };
    },
    createSuccessState(item: Item): AsyncItem<Item> {
      return {
        status: AsyncStatus.SUCCESS,
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
