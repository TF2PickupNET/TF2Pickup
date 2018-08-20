// @flow

import React, { type Node } from 'react';
import {
  Row,
  Col,
  Card,
  message,
} from 'antd';
import injectSheet from 'react-jss';

import app from '../../app';

type State = {
  isFirstConnect: boolean,
  isConnected: boolean,
};
type Props = {
  children: Node,
  classes: {
    container: string,
    card: string,
  },
};

const styles = {
  container: { minHeight: '100vh' },

  card: { margin: 20 },
};

class IsConnected extends React.PureComponent<Props, State> {
  state = {
    isFirstConnect: true,
    isConnected: false,
  };

  componentDidMount() {
    app.io.on('connect', this.onOnline);

    app.io.on('disconnect', this.onOffline);
  }

  onOnline = () => {
    this.setState((state) => {
      if (!state.isFirstConnect) {
        message.info('You just connected back to our server!');
      }

      return {
        isFirstConnect: false,
        isConnected: true,
      };
    });
  };

  onOffline = () => {
    this.setState((state) => {
      if (!state.isFirstConnect) {
        message.warn('We lost the connection to our server!');
      }

      return {
        isFirstConnect: false,
        isConnected: false,
      };
    });
  };

  renderCard() {
    return (
      <Col>
        <Card
          title="It appears we can't connect to our server"
          className={this.props.classes.card}
        >
          Please make sure you are connected to the internet.<br />

          If you are connected to the internet, it might be that our server is down.<br />
          Please wait a few minutes, after that contact an admin over discord.
        </Card>
      </Col>
    );
  }

  render() {
    if (this.state.isConnected) {
      return this.props.children;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        {this.state.isFirstConnect ? (
          <h2>
            Connecting...
          </h2>
        ) : this.renderCard()}
      </Row>
    );
  }
}

export default injectSheet(styles)(IsConnected);
