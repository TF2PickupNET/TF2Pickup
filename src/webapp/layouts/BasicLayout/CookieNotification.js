// @flow

import React from 'react';
import {
  notification,
  Button,
} from 'antd';

type State = { acceptedCookies: boolean };

export default class CookieNotification extends React.Component<{}, State> {
  static KEY = 'ACCEPT-COOKIES';

  timeout = null;

  componentDidMount() {
    if (localStorage.getItem(CookieNotification.KEY) === 'true') {
      return;
    }

    this.timeout = setTimeout(() => {
      notification.info({
        message: 'Please accept our usage of cookies',
        key: CookieNotification.KEY,
        duration: 0,
        onClose: this.handleClose,
        description: (
          <span>
            We are using cookies to enhance your experience of TF2Pickup.
            We use them for automatic signing between sessions,
            automatic redirecting to the last queue from the index page.
          </span>
        ),
        btn: (
          <Button
            type="primary"
            size="small"
            onClick={this.handleClick}
          >
            I accept
          </Button>
        ),
      });
    }, 2000);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  handleClick = () => {
    notification.close(CookieNotification.KEY);

    this.handleClose();
  };

  handleClose = () => {
    localStorage.setItem(CookieNotification.KEY, 'true');
  };

  render() {
    return null;
  }
}
