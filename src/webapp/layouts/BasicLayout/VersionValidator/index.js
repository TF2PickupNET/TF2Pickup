// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import {
  Card,
  Row,
  Col,
  Button,
} from 'antd';
import Helmet from 'react-helmet';

// $FlowFixMe: Flow can't type json files
import pkg from '../../../../../package.json';
import { useMapState } from '../../../utils/use-store';

type Props = {
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

function handleClick() {
  window.location.reload(true);
}

const mapState = (state) => {
  return { version: state.config ? state.config.version : null };
};

function VersionValidator(props: Props) {
  const { version } = useMapState(mapState);

  if (pkg.version === version) {
    return props.children;
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className={props.classes.container}
    >
      <Helmet>
        <title>Invalid Version</title>
      </Helmet>

      <Col>
        <Card title="Please refresh the page">
          It seems that your version is out of sync with the version of the server.
          Please refresh the page to have a consistent experience.

          Server version: {version}
          Your version: {pkg.version}

          <Button onClick={handleClick}>
            Refresh
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(VersionValidator);
