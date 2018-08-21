// @flow

type Options = {
  body?: string,
  tag?: string,
  icon?: string,
};

const Notification = window.Notification;

export default function createNotification(title: string, {
  body,
  tag,
  icon = '',
}: Options = {}) {
  if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    return new Notification(title, {
      body,
      tag,
      icon,
    });
  }

  return null;
}
