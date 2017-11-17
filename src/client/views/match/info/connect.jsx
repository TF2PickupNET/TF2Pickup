import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import openWindowInNewTab from '../../../utils/open-window-in-new-tab';

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
        password: PropTypes.string,
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
      password,
    } = this.props.pickup.server;

    return `connect ${ip}:${port}; password ${password}`;
  }

  getConnectUrl() {
    const {
      ip,
      port,
      password,
    } = this.props.pickup.server;

    return `steam://connect/${ip}:${port}/${password}`;
  }

  handleButtonPress = () => {
    const tab = openWindowInNewTab(this.getConnectUrl());

    setTimeout(() => tab.close(), 100);
  };
  render() {
    if (!this.props.pickup.server.password) {
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

export default injectSheet(Info.styles)(Info);
