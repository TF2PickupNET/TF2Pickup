import React, {
  ReactNode, useEffect, useCallback,
} from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { Row } from '@webapp/components/Grid';
import DocumentTitle from '@webapp/components/DocumentTitle';
import { fetchConfig } from '@webapp/store/config/actions';
import {
  getConfigError,
  getConfigStatus,
} from '@webapp/store/config/selectors';
import {
  State,
  useMapState,
  useActions,
  AsyncStatus,
} from '@webapp/store';

const styles = {
  container: { minHeight: '100vh' },

  text: { textAlign: 'center' },
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

const mapState = (state: State) => {
  return {
    error: getConfigError(state),
    hasLoaded: getConfigStatus(state) === AsyncStatus.FETCHED,
  };
};

function LoadConfig(props: Props) {
  const {
    error,
    hasLoaded,
  } = useMapState(mapState);
  const actions = useActions({ fetchConfig });
  const loadConfig = useCallback(() => {
    actions.fetchConfig();
  }, []);

  useEffect(() => {
    loadConfig();
  }, []);

  if (hasLoaded) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  if (error !== null) {
    return (
      <Row
        justify="center"
        align="center"
        className={props.classes.container}
      >
        <DocumentTitle title="Loading..." />

        <p className={props.classes.text}>
          Error while loading config
        </p>

        <p>
          <Button onClick={loadConfig}>
            Load config
          </Button>
        </p>
      </Row>
    );
  }

  return (
    <Row
      justify="center"
      align="center"
      className={props.classes.container}
    >
      <DocumentTitle title="Loading..." />

      <Spinner size="large" />
    </Row>
  );
}

export default withStyles(styles)(LoadConfig);
