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
    ip: PropTypes.string.isRequired,
    stvPort: PropTypes.number.isRequired,
    stvPassword: PropTypes.string.isRequired,
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
    return `connect ${this.props.ip}:${this.props.stvPort}; password ${this.props.stvPassword}`;
  }

  /**
   * Get the stv connect link.
   *
   * @returns {String} - Returns the link.
   */
  getConnectUrl() {
    return `steam://connect/${this.props.ip}:${this.props.stvPort}/${this.props.stvPassword}`;
  }

  /**
   * Open a new window with the link and close it after 100ms.
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
            Join STV
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(STVConnect.styles)(STVConnect);
