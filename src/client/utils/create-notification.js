export default function createNotification(title, {
  icon = '/assets/images/icons/logo.png',
  timeout = null,
  body,
} = {}) {
  if (Notification.permission === 'granted') {
    console.log(icon);
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

  return null;
}
