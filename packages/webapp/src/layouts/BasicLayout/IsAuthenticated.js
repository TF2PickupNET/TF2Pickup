// @flow

import React, { type Node } from 'react';
import injectSheet, { type StaticClasses } from 'react-jss';
import {
  Card,
  Row,
  Col,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import { API_ENDPOINT } from '../../config';

type Props = {
  userId: string,
  beta: boolean,
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

class IsAuthenticated extends React.PureComponent<Props> {
  handleClick = () => {
    window.location = `${API_ENDPOINT}/auth/steam?url=${window.location.href}`;
  };

  render() {
    if (this.props.userId || !this.props.beta) {
      return this.props.children;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Col>
          <Card title="You need to login">
            <Button onClick={this.handleClick}>
              Login with Steam
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {
      user: state.user ? state.user.id : null,
      beta: state.config.beta,
    };
  })(IsAuthenticated),
);
