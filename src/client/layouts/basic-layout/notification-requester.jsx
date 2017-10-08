import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Button,
  colors,
} from 'materialize-react';
import PropTypes from 'prop-types';

import createNotification from '../../utils/create-notification';

/**
 * Renders a bar at the top to ask the user about notification permissions.
 *
 * @class
 */
class NotificationRequester extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      bar: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    bar: {
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

  /**
   * Request the permission whether or not we can create notifications.
   */
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

  /**
   * When the user clicks the button, we request the permission from the user.
   */
  handlePress = () => {
    this.requestPermission();
  };

  render() {
    if (this.state.hideBar) {
      return null;
    }

    return (
      <div className={this.props.classes.bar}>
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
