import React, {
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  useMakeMapState,
  State,
  useActions,
} from '@webapp/store';
import {
  showNotification,
  removeNotification,
  animateNotificationOut,
  animateNotificationIn,
} from '@webapp/store/notifications/actions';
import { makeGetNotificationById } from '@webapp/store/notifications/selectors';
import { NotificationState } from '@webapp/store/notifications/types';

import Notification from './Notification';

const makeMapState = () => {
  const getNotificationById = makeGetNotificationById();

  return (state: State, id: number) => {
    return { notification: getNotificationById(state, id) };
  };
};

interface OwnProps {
  id: number,
}

function NotificationContainer(props: OwnProps) {
  const { notification } = useMakeMapState(makeMapState, props.id);
  const actions = useActions({
    showNotification,
    removeNotification,
    animateNotificationIn,
    animateNotificationOut,
  });
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (notification) {
      switch (notification.state) {
        case NotificationState.WAITING: {
          actions.animateNotificationIn(props.id);
          break;
        }
        case NotificationState.VISIBLE: {
          timeout.current = setTimeout(() => {
            actions.animateNotificationOut(props.id);
          }, notification.timeout);
          break;
        }
        default: break;
      }
    }

    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, [notification]);

  const handleAnimationEnd = useCallback(() => {
    if (notification) {
      switch (notification.state) {
        case NotificationState.ANIMATING_IN: {
          actions.showNotification(props.id);
          break;
        }
        case NotificationState.ANIMATING_OUT: {
          actions.removeNotification(props.id);
          break;
        }
        default: break;
      }
    }
  }, [notification]);

  if (!notification) {
    return null;
  }

  return (
    <Notification
      type={notification.type}
      state={notification.state}
      message={notification.message}
      onAnimationEnd={handleAnimationEnd}
    />
  );
}

export default NotificationContainer;
