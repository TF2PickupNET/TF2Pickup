import React, { ReactNode } from 'react';
import injectSheet, {Classes} from 'react-jss';

import {Row} from '../../../components/Grid';

import {
  useIsConnected,
  useIsFirstConnect,
} from './use-is-connected';
import DocumentTitle from "../../../components/DocumentTitle";

const styles = {
  container: { minHeight: '100vh' },

  text: {
    margin: '0px 15% 16px',
    textAlign: 'center',
  },
};

interface Props extends Classes<typeof styles> {
  children: ReactNode,
}

function IsConnected(props: Props) {
  const isConnected = useIsConnected();
  const isFirstConnect = useIsFirstConnect();

  if (isConnected) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  return (
    <Row
      dir="column"
      justify="center"
      align="center"
      className={props.classes.container}
    >
      <DocumentTitle title="Connecting..." />

      <h2 className={props.classes.text}>
        {isFirstConnect ? 'Connecting...' : 'No connection'}
      </h2>

      {!isFirstConnect && (
        <p className={props.classes.text}>
          It appears you have lost the connection to our server.
          <br />
          Please make sure you are connected to the internet.
          <br />
          If you are connected to the internet, it might be that our server is down.
          <br />
          Please wait a few minutes, after that contact an admin over discord.
        </p>
      )}
    </Row>
  );
}

export default injectSheet<Props>(styles)(IsConnected);
