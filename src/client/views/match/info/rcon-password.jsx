import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import copy from '../../../utils/copy';

class Info extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    pickup: PropTypes.shape({
      server: PropTypes.shape({
        ip: PropTypes.string,
        port: PropTypes.string,
        rconPassword: PropTypes.string,
      }),
    }).isRequired,
  };

  static styles = {
    card: {
      height: 64,
      display: 'grid',
      gridTemplateColumns: '1fr auto',
    },

    item: {
      padding: 16,
      lineHeight: '32px',
      fontSize: 16,
    },

    button: { alignSelf: 'center' },
  };

  getConnect() {
    const {
      ip,
      port,
      rconPassword,
    } = this.props.pickup.server;

    return `rcon_address ${ip}:${port}; rcon_password ${rconPassword}`;
  }

  handleButtonPress = () => copy(this.getConnectUrl());

  render() {
    if (!this.props.pickup.server.rconPassword) {
      return null;
    }

    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onRelease={this.handleButtonPress}>
            Copy RCON
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Info.styles)(Info);
