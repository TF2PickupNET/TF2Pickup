import React from 'react';
import { NotificationType } from '@webapp/store/notifications/types';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import InfoIcon from '@atlaskit/icon/glyph/info';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/cross-circle';
import theme from '@webapp/theme';

interface OwnProps {
  type: NotificationType,
}

function getIcon(type: NotificationType) {
  switch (type) {
    case NotificationType.ERROR:
      return ErrorIcon;
    case NotificationType.WARN:
      return WarningIcon;
    case NotificationType.INFO:
      return InfoIcon;
    case NotificationType.SUCCESS:
      return SuccessIcon;
    default:
      return null;
  }
}

function NotificationIcon(props: OwnProps) {
  const Icon = getIcon(props.type);

  if (Icon === null) {
    return null;
  }

  return (
    <Icon
      label="Notification icon"
      primaryColor="white"
      secondaryColor={theme.notification.color[props.type]}
    />
  );
}

export default NotificationIcon;
