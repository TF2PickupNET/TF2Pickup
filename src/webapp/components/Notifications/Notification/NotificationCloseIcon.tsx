import React, { useCallback } from 'react';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import withStyles, { WithStyles } from 'react-jss';
import { useActions } from '@webapp/store';
import { animateNotificationOut } from '@webapp/store/notifications/actions';

const styles = {
  closeIconContainer: {
    marginLeft: 8,
    cursor: 'pointer',
    marginTop: 4,
  },
};

interface Props extends WithStyles<typeof styles> {
  notificationId: number,
}

function NotificationCloseIcon(props: Props) {
  const actions = useActions({ animateNotificationOut });
  const handleCloseClick = useCallback(() => {
    actions.animateNotificationOut(props.notificationId);
  }, [props.notificationId]);

  return (
    <span
      className={props.classes.closeIconContainer}
      onClick={handleCloseClick}
    >
      <CloseIcon
        size="small"
        label="Close"
        primaryColor="white"
      />
    </span>
  );
}

export default withStyles(styles)(NotificationCloseIcon);
