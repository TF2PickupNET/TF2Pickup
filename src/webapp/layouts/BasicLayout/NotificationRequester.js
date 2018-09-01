// @flow

import React from 'react';
import {
  notification,
  Button,
} from 'antd';
import injectSheet from 'react-jss';

type State = { acceptedCookies: boolean };
type Props = { classes: { acceptButton: string } };

const styles = { acceptButton: { marginLeft: 16 } };

class NotificationRequester extends React.Component<Props, State> {
  static KEY = 'REQUEST-NOTIFICATION-ACCESS';

  static DESCRIPTION = (
    <span>
      We are using notifications to enhance your experience of TF2Pickup.
      You will get notifications when your pickup starts,
      someone mentions you and more to come.
    </span>
  );

  static close() {
    notification.close(NotificationRequester.KEY);
  }

  timeout = null;

  componentDidMount() {
    if (window.Notification.permission !== 'default') {
      return;
    }

    this.timeout = setTimeout(() => {
      notification.info({
        message: 'Please enable notifications',
        key: NotificationRequester.KEY,
        duration: 0,
        description: NotificationRequester.DESCRIPTION,
        btn: this.renderButtons(),
      });
    }, 5000);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  handleAcceptClick = () => {
    NotificationRequester.close();

    window.Notification.requestPermission();
  };

  handleDenyClick = () => {
    NotificationRequester.close();
  };

  renderButtons() {
    return (
      <React.Fragment>
        <Button
          size="small"
          onClick={this.handleDenyClick}
        >
          No thanks
        </Button>

        <Button
          type="primary"
          size="small"
          className={this.props.classes.acceptButton}
          onClick={this.handleAcceptClick}
        >
          Yes go ahead
        </Button>
      </React.Fragment>
    );
  }

  render() {
    return null;
  }
}

export default injectSheet(styles)(NotificationRequester);
