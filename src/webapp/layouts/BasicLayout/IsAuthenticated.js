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

import { type State } from '../../store';
import { redirectToSteamAuth } from '../../utils/auth';
import { getCurrentUserId } from '../../store/user-id/selectors';

type Props = {
  userId: string | null,
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

class IsAuthenticated extends React.PureComponent<Props> {
  handleClick = () => redirectToSteamAuth();

  render() {
    if (this.props.userId === null) {
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

    return this.props.children;
  }
}

const mapStateToProps = (state: State): $Shape<Props> => {
  return { userId: getCurrentUserId(state) };
};

export default injectSheet(styles)(
  connect(mapStateToProps)(IsAuthenticated)
);
