// @flow

import React, { useEffect } from 'react';
import {
  notification,
  Button,
} from 'antd';

const KEY = 'ACCEPT-COOKIES';

function handleClick() {
  notification.close(KEY);

  localStorage.setItem(KEY, 'true');
}

function showNotification() {
  notification.info({
    message: 'Please accept our usage of cookies',
    key: KEY,
    duration: 0,
    onClose: handleClick,
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
        onClick={handleClick}
      >
        I accept
      </Button>
    ),
  });
}

export default function CookieNotification() {
  useEffect(() => {
    if (localStorage.getItem(KEY) === 'true') {
      return null;
    }

    const timeout = setTimeout(() => {
      showNotification();
    }, 5 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
