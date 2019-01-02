const enum AsyncStatus {
  NOT_STARTED = 'NOT-STARTED',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type AsyncItem<T> =
   { status: AsyncStatus.LOADING, item: null, error: null }
 | { status: AsyncStatus.SUCCESS, item: T, error: null }
 | { status: AsyncStatus.ERROR, item: null, error: Error }
 | { status: AsyncStatus.NOT_STARTED, item: null, error: null };

function createStateCreator<T>() {
  return {
    createLoadingState(): AsyncItem<T> {
      return {
        status: AsyncStatus.LOADING,
        item: null,
        error: null,
      };
    },
    createNotStartedState(): AsyncItem<T> {
      return {
        status: AsyncStatus.LOADING,
        item: null,
        error: null,
      };
    },
    createSuccessState(item: T): AsyncItem<T> {
      return {
        status: AsyncStatus.SUCCESS,
        item,
        error: null,
      };
    },
    createErrorState(error: Error): AsyncItem<T> {
      return {
        status: AsyncStatus.ERROR,
        item: null,
        error,
      };
    }
  };
}

export {
  createStateCreator,
  AsyncItem,
  AsyncStatus,
};
