import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Container } from '@webapp/components/Grid';
import Spinner from '@atlaskit/spinner';
import DocumentTitle from '@webapp/components/DocumentTitle';
import {
  useMapState,
  State,
} from '@webapp/store';
import {
  getIsConnected,
  getIsFirstConnect,
} from '@webapp/store/connection/selectors';

const styles = {
  container: {
    minHeight: '100vh',
    flex: 1,
  },

  text: {
    margin: '0px 15% 16px',
    textAlign: 'center',
  },
};

const mapState = (state: State) => {
  return {
    isConnected: getIsConnected(state),
    isFirstConnect: getIsFirstConnect(state),
  };
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function IsConnected(props: Props) {
  const {
    isConnected,
    isFirstConnect,
  } = useMapState(mapState);

  if (isConnected) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  return (
    <Container
      dir="column"
      justify="center"
      align="center"
      className={props.classes.container}
    >
      <DocumentTitle title="Connecting..." />

      {isFirstConnect ? (
        <Spinner delay={200} />
      ) : (
        <React.Fragment>
          <h2 className={props.classes.text}>
            No connection
          </h2>

          <p className={props.classes.text}>
            It appears you have lost the connection to our server.
            <br />
            Please make sure you are connected to the internet.
            <br />
            If you are connected to the internet, it might be that our server is down.
            <br />
            Please wait a few minutes, after that contact an admin over discord.
          </p>
        </React.Fragment>
      )}
    </Container>
  );
}

export default withStyles(styles)(IsConnected);
