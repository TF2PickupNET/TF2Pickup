import iconUrl from '../../assets/images/icons/logo.png';

/**
 * Create a new notification if we have the permission to do so.
 *
 * @param {String} title - The title of the notification.
 * @param {Object} options - Additional options for the notification.
 * @param {Number} [options.timeout] - A timeout after which the notification should be closed.
 * @param {String} options.body - The body for the notification.
 * @returns {(Boolean|Object)} - Returns either the notification object or false
 * when no notification was created.
 */
export default function createNotification(title, {
  timeout = null,
  body,
} = {}) {
  if (Notification && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon: iconUrl,
    });

    if (timeout) {
      setTimeout(() => {
        notification.close();
      }, timeout);
    }

    return notification;
  }

  return false;
}
