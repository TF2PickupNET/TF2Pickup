import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Button,
  colors,
} from 'materialize-react';

import createNotification from '../../utils/create-notification';

class NotificationRequester extends PureComponent {
  static styles = {
    container: {
      height: 48,
      padding: '4px 16px',
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box',
      lineHeight: '40px',
      alignItems: 'center',
      color: colors.whiteText,
      backgroundColor: colors.orange500,
    },

    button: { color: 'inherit' },
  };

  state = { hideBar: Notification.permission !== 'default' };

  async requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      createNotification('TF2Pickup', {
        timeout: 5 * 1000,
        body: 'Nice, notifications are enabled',
      });
    }

    this.setState({ hideBar: true });
  }

  handlePress = () => {
    this.requestPermission();
  };

  render() {
    if (this.state.hideBar) {
      return null;
    }

    return (
      <div className={this.props.classes.container}>
        TF2Pickup works better with Desktop Notifications

        <Button
          className={this.props.classes.button}
          onPress={this.handlePress}
        >
          Enable Notifications
        </Button>
      </div>
    );
  }
}

export default injectSheet(NotificationRequester.styles)(NotificationRequester);
