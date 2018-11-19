// @flow

import React, { type Node } from 'react';
import {
  Row,
  Col,
  Card,
} from 'antd';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';

import {
  useIsConnected,
  useIsFirstConnect,
} from './use-is-connected';

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

function IsConnected(props: Props) {
  const isConnected = useIsConnected();
  const isFirstConnect = useIsFirstConnect();

  if (isConnected) {
    return props.children;
  }

  const content = isFirstConnect ? (
    <h2>
      Connecting...
    </h2>
  ) : (
    <Col>
      <Card
        title="It appears we can't connect to our server"
        className={props.classes.card}
      >
        Please make sure you are connected to the internet.<br />

        If you are connected to the internet, it might be that our server is down.<br />
        Please wait a few minutes, after that contact an admin over discord.
      </Card>
    </Col>
  );

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className={props.classes.container}
    >
      <Helmet>
        <title>Connecting...</title>
      </Helmet>

      {content}
    </Row>
  );
}

export default injectSheet(styles)(IsConnected);
