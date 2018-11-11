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

import { type State } from '../../../store';
import { redirectToSteamAuth } from '../../../utils/auth';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { useMapState } from '../../../utils/use-store';

type Props = {
  children: Node,
  classes: { container: string },
};

const styles = { container: { minHeight: '100vh' } };

function handleClick() {
  redirectToSteamAuth();
}

const mapState = (state: State) => {
  return { userId: getCurrentUserId(state) };
};

function IsAuthenticated(props: Props) {
  const { userId } = useMapState(mapState);

  if (userId === null) {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={props.classes.container}
      >
        <Helmet>
          <title>Not Authenticated</title>
        </Helmet>

        <Col>
          <Card title="You need to login">
            <Button onClick={handleClick}>
              Login with Steam
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }

  return props.children;
}

export default injectSheet(styles)(IsAuthenticated);
