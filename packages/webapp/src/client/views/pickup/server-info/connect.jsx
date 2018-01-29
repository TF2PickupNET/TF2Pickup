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
    ip: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
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
    return `connect ${this.props.ip}:${this.props.port}; password ${this.props.password}`;
  }

  /**
   * Get the connect url.
   *
   * @returns {String} - Returns the connect url.
   */
  getConnectUrl() {
    return `steam://connect/${this.props.ip}:${this.props.port}/${this.props.password}`;
  }

  /**
   * Create a new window and close it when the button get's pressed.
   */
  handleButtonPress = () => {
    openWindowInNewTab(this.getConnectUrl());
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onPress={this.handleButtonPress}>
            Join server
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Connect.styles)(Connect);
