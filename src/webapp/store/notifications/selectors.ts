import { State } from '@webapp/store';
import { createSelector } from 'reselect';

const getNotifications = (state: State) => state.notifications;

const getFirstThreeNotificationIds = createSelector(
  getNotifications,
  notifications => notifications
    .filter((_, index) => index < 3)
    .map(notification => notification.id),
);

const makeGetNotificationById = () => createSelector(
  getNotifications,
  (_, id: number) => id,
  (notifications, id) => notifications.find(notification => notification.id === id) || null,
);

export {
  getFirstThreeNotificationIds,
  makeGetNotificationById,
};
