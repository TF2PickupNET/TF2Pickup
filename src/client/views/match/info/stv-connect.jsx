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
        stvPort: PropTypes.string,
        stvPassword: PropTypes.string,
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
      stvPort,
      stvPassword,
    } = this.props.pickup.server;

    return `connect ${ip}:${stvPort}; password ${stvPassword}`;
  }

  getConnectUrl() {
    const {
      ip,
      stvPort,
      stvPassword,
    } = this.props.pickup.server;

    return `steam://connect/${ip}:${stvPort}/${stvPassword}`;
  }

  handleButtonPress = () => {
    const tab = openWindowInNewTab(this.getConnectUrl());

    setTimeout(() => tab.close(), 100);
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button onRelease={this.handleButtonPress}>
            Join STV
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Info.styles)(Info);
