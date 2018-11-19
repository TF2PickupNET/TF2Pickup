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
import { getVersion } from '../../../store/config/selectors';
import { getHasUpdate } from '../../../store/has-update/selectors';

type Props = {
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

function handleClick() {
  window.location.reload(true);
}

const mapState = (state) => {
  return {
    version: getVersion(state),
    hasUpdate: getHasUpdate(state),
  };
};

function VersionValidator(props: Props) {
  const {
    version,
    hasUpdate,
  } = useMapState(mapState);

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
        <Card
          title="Please refresh the page"
          actions={hasUpdate && (
            <Button onClick={handleClick}>
              Refresh
            </Button>
          )}
        >
          It seems that your version is out of sync with the version of the server.
          Please refresh the page to have a consistent experience.

          Server version: {version}
          Your version: {pkg.version}

          {hasUpdate && 'An update is available, reload the page to download it.'}
        </Card>
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(VersionValidator);
