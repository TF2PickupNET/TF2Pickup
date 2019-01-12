import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';

import { Row } from '../../../components/Grid';
import pkg from '../../../../../package.json';
import { useMapState } from '../../../store/use-store';
import { getVersion } from '../../../store/config/selectors';
import { State } from '../../../store';
import DocumentTitle from '../../../components/DocumentTitle';

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
    <Row
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
    </Row>
  );
}

export default withStyles(styles)(VersionValidator);
