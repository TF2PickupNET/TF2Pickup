import { State, Actions, NotificationActionTypes, NotificationState } from './types';

let notificationId = 0;

function reducer(state: State | undefined = [], action: Actions): State {
  switch (action.type) {
    case NotificationActionTypes.CREATE: {
      return [
        ...state,
        {
          id: notificationId++,
          type: action.payload.type,
          message: action.payload.message,
          state: NotificationState.WAITING,
          timeout: action.payload.timeout,
        }
      ];
    }
    case NotificationActionTypes.ANIMATE_IN: {
      return state.map(notification => {
        if (notification.id === action.payload.notificationId) {
          return {
            ...notification,
            state: NotificationState.ANIMATING_IN,
          };
        }

        return notification;
      });
    }
    case NotificationActionTypes.SHOW: {
      return state.map(notification => {
        if (notification.id === action.payload.notificationId) {
          return {
            ...notification,
            state: NotificationState.VISIBLE,
          };
        }

        return notification;
      });
    }
    case NotificationActionTypes.ANIMATE_OUT: {
      return state.map(notification => {
        if (notification.id === action.payload.notificationId) {
          return {
            ...notification,
            state: NotificationState.ANIMATING_OUT,
          };
        }

        return notification;
      });
    }
    case NotificationActionTypes.REMOVE: {
      return state.filter(notification => notification.id !== action.payload.notificationId);
    }
    default: return state;
  }
}

export default reducer;
