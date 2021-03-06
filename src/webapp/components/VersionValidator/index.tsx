import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';
import { Container } from '@webapp/components/Grid';
import { getVersion } from '@webapp/store/config/selectors';
import {
  State,
  useMapState,
} from '@webapp/store';
import DocumentTitle from '@webapp/components/DocumentTitle';

import pkg from '../../../../package.json';

const styles = { container: { minHeight: '100vh' } };

function handleClick() {
  window.location.reload();
}

const mapState = (state: State) => {
  return { version: getVersion(state) };
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function VersionValidator(props: Props) {
  const { version } = useMapState(mapState);

  if (pkg.version === version) {
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
      <DocumentTitle title="Invalid Version" />

      <h2>
        Please refresh the page
      </h2>

      <p>
        It seems that your version is out of sync with the version of the server.
        Please refresh the page to have a consistent experience.
        <br />
        Server version: {version}
        Your version: {pkg.version}
        <br />

        <Button onClick={handleClick}>
          Refresh
        </Button>
      </p>
    </Container>
  );
}

export default withStyles(styles)(VersionValidator);
