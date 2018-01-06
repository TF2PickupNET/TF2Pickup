import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import openWindowInNewTab from '../../../utils/open-window-in-new-tab';

/**
 * The STV connect for the pickup.
 *
 * @class
 */
class STVConnect extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    pickup: PropTypes.shape({
      server: PropTypes.shape({
        ip: PropTypes.string,
        stvPort: PropTypes.number,
        stvPassword: PropTypes.string,
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
   * Get the stv connect string for the pickup.
   *
   * @returns {String} - Returns the command.
   */
  getConnect() {
    const {
      ip,
      stvPort,
      stvPassword,
    } = this.props.pickup.server;

    return `connect ${ip}:${stvPort}; password ${stvPassword}`;
  }

  /**
   * Get the stv connect link.
   *
   * @returns {String} - Returns the link.
   */
  getConnectUrl() {
    const {
      ip,
      stvPort,
      stvPassword,
    } = this.props.pickup.server;

    return `steam://connect/${ip}:${stvPort}/${stvPassword}`;
  }

  /**
   * Open a new window with the link and close it after 100ms.
   */
  handleButtonPress = () => {
    const tab = openWindowInNewTab(this.getConnectUrl());

    setTimeout(() => tab.close(), 100);
  };

  render() {
    if (!this.props.pickup.server) {
      return null;
    }

    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onPress={this.handleButtonPress}>
            Join STV
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(STVConnect.styles)(STVConnect);
