import React, { AnimationEventHandler } from 'react';
import { colors } from '@atlaskit/theme';
import withStyles, { WithStyles } from 'react-jss';
import { NotificationState, NotificationType } from '@webapp/store/notifications/types';
import NotificationIcon from './NotificationIcon';
import NotificationCloseIcon from './NotificationCloseIcon';
import { Theme } from '@webapp/theme';

interface OwnProps {
  id: number,
  message: string,
  type: NotificationType,
  state: NotificationState,
  onAnimationEnd: AnimationEventHandler,
}

function getColorForNotificationType(type: NotificationType) {
  switch (type) {
    case NotificationType.SUCCESS:
      return colors.G400;
    case NotificationType.INFO:
      return colors.B400;
    case NotificationType.WARN:
      return colors.Y300;
    case NotificationType.ERROR:
      return colors.R300;
    default:
      return '';
  }
}

const styles = (theme: Theme) => {
  return {
    '@keyframes animateIn': {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-200%)' },
    },

    '@keyframes animateOut': {
      from: { transform: 'translateX(-200%)' },
      to: { transform: 'translateX(0)' },
    },

    container: {
      borderRadius: 6,
      width: 200,
      padding: '8px 16px',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 16,
      right: -400,
      position: 'absolute',
      backgroundColor: (props: OwnProps) => getColorForNotificationType(props.type),
      animationDuration: 333,
      animationFillMode: 'forwards',
      // TODO: Wait for jss support for dynamic animation names
      animationName(props: OwnProps) {
        switch (props.state) {
          case NotificationState.VISIBLE:
          case NotificationState.ANIMATING_IN:
            return '$animateIn';
          case NotificationState.ANIMATING_OUT:
            return'$animateOut';
          default:
            return null;
        }
      },
    },

    animateIn: {
      animationName: '$animateIn',
    },

    animateOut: {
      animationName: '$animateOut'
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
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function getClassName(classes: Props['classes'], state: NotificationState) {
  switch (state) {
    case NotificationState.VISIBLE:
    case NotificationState.ANIMATING_IN:
      return `${classes.container} ${classes.animateIn}`;
    case NotificationState.ANIMATING_OUT:
      return `${classes.container} ${classes.animateOut}`;
    default:
      return classes.container;
  }
}

function Notification(props: Props) {
  return (
    <span
      className={getClassName(props.classes, props.state)}
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

export { getColorForNotificationType };

export default withStyles(styles)(Notification);
