import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import copy from '../../../utils/copy';

/**
 * The rcon password command.
 *
 * @class
 */
class RCONPassword extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    ip: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
    rconPassword: PropTypes.string.isRequired,
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
   * Get the rcon connect command.
   *
   * @returns {String} - Returns the command.
   */
  getConnect() {
    const ip = this.props.ip;
    const port = this.props.port;
    const rconPassword = this.props.rconPassword;

    return `rcon_address ${ip}:${port}; rcon_password ${rconPassword}`;
  }

  /**
   * Copy the rcon connect command.
   */
  handleButtonPress = () => copy(this.getConnect());

  render() {
    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onPress={this.handleButtonPress}>
            Copy RCON
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(RCONPassword.styles)(RCONPassword);
