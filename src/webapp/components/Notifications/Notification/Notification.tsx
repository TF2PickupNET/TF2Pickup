import React, { AnimationEventHandler } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { NotificationState, NotificationType } from '@webapp/store/notifications/types';
import NotificationIcon from './NotificationIcon';
import NotificationCloseIcon from './NotificationCloseIcon';
import theme from '@webapp/theme';

interface OwnProps {
  id: number,
  message: string,
  type: NotificationType,
  state: NotificationState,
  onAnimationEnd: AnimationEventHandler,
}

const styles = {
  '@keyframes animateIn': {
    from: { transform: 'translateX(200%)' },
    to: { transform: 'translateX(0)' },
  },

  '@keyframes animateOut': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(200%)' },
  },

  container: {
    borderRadius: 6,
    minWidth: 200,
    maxWidth: 350,
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    animationDuration: 333,
    animationFillMode: 'forwards',
    from: { transform: 'translateX(200%)' },
    backgroundColor: (props: OwnProps) => theme.notification.color[props.type],
    animationName(props: OwnProps) {
      switch (props.state) {
        case NotificationState.VISIBLE:
        case NotificationState.ANIMATING_IN:
          return '$animateIn';
        case NotificationState.ANIMATING_OUT:
          return '$animateOut';
        default:
          return null;
      }
    },
  },

  message: {
    color: theme.textColor.light,
    flex: 1,
    fontSize: 15,
    lineHeight: 1.3,
    marginLeft: 8,
    alignSelf: 'center',
  },
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function Notification(props: Props) {
  return (
    <span
      className={props.classes.container}
      onAnimationEnd={props.onAnimationEnd}
    >
      <NotificationIcon type={props.type} />

      <span className={props.classes.message}>
        {props.message}
      </span>

      <NotificationCloseIcon notificationId={props.id} />
    </span>
  );
}

export default withStyles(styles)(Notification);
