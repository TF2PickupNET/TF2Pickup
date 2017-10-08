/**
 * Create a new notification if we have the permission to do so.
 *
 * @param {String} title - The title of the notification.
 * @param {Object} options - Additional options for the notification.
 * @param {String} [options.icon] - An optional icon for the notification.
 * Default to the TF2Pickup logo.
 * @param {Number} [options.timeout] - A timeout after which the notification should be closed.
 * @param {String} options.body - The body for the notification.
 * @returns {(Boolean|Object)} - Returns either the notification object or false
 * when no notification was created.
 */
export default function createNotification(title, {
  icon = '/assets/images/icons/logo.png',
  timeout = null,
  body,
} = {}) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon,
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
