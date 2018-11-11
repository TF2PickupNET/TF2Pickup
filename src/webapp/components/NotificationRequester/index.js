// @flow

import React, { useEffect } from 'react';
import {
  notification,
  Button,
} from 'antd';
import injectSheet from 'react-jss';

type Props = { classes: { acceptButton: string } };

const styles = { acceptButton: { marginLeft: 16 } };
const KEY = 'REQUEST-NOTIFICATION-ACCESS';

function handleAcceptClick() {
  notification.close(KEY);

  window.Notification.requestPermission();
}

function handleDenyClick() {
  notification.close(KEY);
}

function showNotification(classes) {
  notification.info({
    message: 'Please enable notifications',
    key: KEY,
    duration: 0,
    description: (
      <span>
        We are using notifications to enhance your experience of TF2Pickup.
        You will get notifications when your pickup starts,
        someone mentions you and more to come.
      </span>
    ),
    btn: (
      <React.Fragment>
        <Button
          size="small"
          onClick={handleDenyClick}
        >
          No thanks
        </Button>

        <Button
          type="primary"
          size="small"
          className={classes.acceptButton}
          onClick={handleAcceptClick}
        >
          Yes go ahead
        </Button>
      </React.Fragment>
    ),
  });
}

function NotificationRequester(props: Props) {
  useEffect(() => {
    if (window.Notification.permission === 'default') {
      const timeout = setTimeout(() => {
        showNotification(props.classes);
      }, 5000);

      return () => clearTimeout(timeout);
    }

    return null;
  }, []);

  return null;
}

export default injectSheet(styles)(NotificationRequester);
