// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import {
  Card,
  Row,
  Col,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// $FlowFixMe: Flow can't type json files
import pkg from '../../../../package.json';

type Props = {
  version: string,
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

class IsAuthenticated extends React.PureComponent<Props> {
  handleClick = () => window.location.reload(true);

  render() {
    if (pkg.version === this.props.version) {
      return this.props.children;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Helmet>
          <title>Invalid Version</title>
        </Helmet>

        <Col>
          <Card title="Please refresh the page">
            It seems that your version is out of sync with the version of the server.
            Please refresh the page to have a consistent experience.

            Server version: {this.props.version}
            Your version: {pkg.version}

            <Button onClick={this.handleClick}>
              Refresh
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default injectSheet(styles)(connect((state) => {
  return { version: state.config.version };
})(IsAuthenticated));
