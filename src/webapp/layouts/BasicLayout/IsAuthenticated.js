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
import { compose } from 'redux';

import { type State } from '../../store';
import { redirectToSteamAuth } from '../../utils/auth';
import { getCurrentUserId } from '../../store/user-id/selectors';

type Props = {
  userId: string,
  beta: boolean,
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

class IsAuthenticated extends React.PureComponent<Props> {
  handleClick = () => redirectToSteamAuth();

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
        <Helmet>
          <title>Not Authenticated</title>
        </Helmet>

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

export default compose(
  injectSheet(styles),
  connect((state: State) => {
    return { userId: getCurrentUserId(state) };
  }),
)(IsAuthenticated);
