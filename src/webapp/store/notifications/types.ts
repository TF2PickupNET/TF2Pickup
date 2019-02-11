import { Action } from '@webapp/store';

enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

enum NotificationState {
  WAITING = 'WAITING',
  ANIMATING_IN = 'ANIMATING-IN',
  VISIBLE = 'VISIBLE',
  ANIMATING_OUT = 'ANIMATING-OUT',
}

interface Notification {
  id: number,
  type: NotificationType,
  message: string,
  state: NotificationState,
  timeout: number,
}

type State = Notification[];

enum NotificationActionTypes {
  CREATE = 'NOTIFICATION/CREATE',
  ANIMATE_IN = 'NOTIFICATION/ANIMATE-IN',
  SHOW = 'NOTIFICATION/SHOW',
  ANIMATE_OUT = 'NOTIFICATION/ANIMATE-OUT',
  REMOVE = 'NOTIFICATION/REMOVE',
}

type Actions =
  | Action<typeof NotificationActionTypes.CREATE, {
      message: string,
      type: NotificationType,
      timeout: number,
    }>
  | Action<typeof NotificationActionTypes.ANIMATE_IN, { notificationId: number }>
  | Action<typeof NotificationActionTypes.SHOW, { notificationId: number }>
  | Action<typeof NotificationActionTypes.ANIMATE_OUT, { notificationId: number }>
  | Action<typeof NotificationActionTypes.REMOVE, { notificationId: number }>;

export {
  NotificationActionTypes,
  NotificationType,
  NotificationState,
  State,
  Notification,
  Actions,
};

