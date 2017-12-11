import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import openWindowInNewTab from '../../../utils/open-window-in-new-tab';

/**
 * The connect for the pickup.
 *
 * @class
 */
class Connect extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    pickup: PropTypes.shape({
      server: PropTypes.shape({
        ip: PropTypes.string,
        port: PropTypes.number,
        password: PropTypes.string,
      }),
    }).isRequired,
  };

  static styles = {
    card: {
      height: 64,
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      margin: 0,
    },

    item: {
      padding: 16,
      lineHeight: '32px',
      fontSize: 16,
    },

    button: { alignSelf: 'center' },
  };

  /**
   * Get the connect string.
   *
   * @returns {String} - Returns the connect command.
   */
  getConnect() {
    const {
      ip,
      port,
      password,
    } = this.props.pickup.server;

    return `connect ${ip}:${port}; password ${password}`;
  }

  /**
   * Get the connect url.
   *
   * @returns {String} - Returns the connect url.
   */
  getConnectUrl() {
    const {
      ip,
      port,
      password,
    } = this.props.pickup.server;

    return `steam://connect/${ip}:${port}/${password}`;
  }

  /**
   * Create a new window and close it when the button get's pressed.
   */
  handleButtonPress = () => {
    const tab = openWindowInNewTab(this.getConnectUrl());

    setTimeout(() => tab.close(), 100);
  };

  render() {
    if (!this.props.pickup.server || !this.props.pickup.server.password) {
      return null;
    }

    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onRelease={this.handleButtonPress}>
            Join server
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Connect.styles)(Connect);
