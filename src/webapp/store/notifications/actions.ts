import {
  NotificationActionTypes,
  NotificationType,
  Actions,
} from '@webapp/store/notifications/types';
import { AsyncAction } from '@webapp/store';

function createNotification(type: NotificationType, message: string, timeout: number): AsyncAction {
  return async (dispatch) => {
    dispatch({
      type: NotificationActionTypes.CREATE,
      payload: {
        message,
        type,
        timeout,
      },
    });

    switch (type) {
      case NotificationType.ERROR:
      case NotificationType.WARN:
        console.warn(message);
        break;
      default: break;
    }
  };
}

function showNotification(notificationId: number): Actions {
  return {
    type: NotificationActionTypes.SHOW,
    payload: { notificationId },
  };
}

function animateNotificationOut(notificationId: number): Actions {
  return {
    type: NotificationActionTypes.ANIMATE_OUT,
    payload: { notificationId },
  };
}

function animateNotificationIn(notificationId: number): Actions {
  return {
    type: NotificationActionTypes.ANIMATE_IN,
    payload: { notificationId },
  };
}

function removeNotification(notificationId: number): Actions {
  return {
    type: NotificationActionTypes.REMOVE,
    payload: { notificationId },
  };
}

export {
  createNotification,
  animateNotificationIn,
  showNotification,
  animateNotificationOut,
  removeNotification,
};
