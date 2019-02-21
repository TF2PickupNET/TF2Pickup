import React, {
  useEffect,
  ReactNode,
} from 'react';
import Spinner from '@atlaskit/spinner';
import {
  useActions,
  State,
  useMakeMapState,
  AsyncStatus,
} from '@webapp/store';
import { fetchConfig } from '@webapp/store/config/actions';
import { getIsConnected } from '@webapp/store/connection/selectors';
import { getConfigStatus } from '@webapp/store/config/selectors';
import { Row } from '@webapp/components/Grid';
import withStyles, { WithStyles } from 'react-jss';

const makeMapState = () => {
  return (state: State) => {
    return {
      isConnected: getIsConnected(state) || true,
      hasFetchedConfig: getConfigStatus(state) === AsyncStatus.FETCHED,
    };
  };
};

const styles = {
  container: {
    flex: 1,
    height: '100vh',
  },
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function LoadingScreen(props: Props) {
  const actions = useActions({ fetchConfig });
  const {
    isConnected,
    hasFetchedConfig,
  } = useMakeMapState(makeMapState);

  useEffect(() => {
    if (isConnected) {
      actions.fetchConfig();
    }
  }, [isConnected]);

  if (hasFetchedConfig) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  return (
    <Row
      align="center"
      justify="center"
      className={props.classes.container}
    >
      <Spinner />
    </Row>
  );
}

export default withStyles(styles)(LoadingScreen);
