// @flow

import React, {
  type Node,
  useEffect,
  useState,
} from 'react';
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
import useActions from '../../../utils/use-actions';
import { authenticate } from '../../../store/user-id/actions';
import useIsMounted from '../../../utils/use-is-mounted';

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
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const actions = useActions({ authenticate });
  const isMounted = useIsMounted();

  useEffect(() => {
    actions.authenticate(() => {
      if (isMounted.current) {
        setIsAuthenticating(false);
      }
    });
  }, []);

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
          {isAuthenticating ? (
            <h4>Authenticating...</h4>
          ) : (
            <Card title="You need to login">
              <Button onClick={handleClick}>
                Login with Steam
              </Button>
            </Card>
          )}
        </Col>
      </Row>
    );
  }

  return props.children;
}

export default injectSheet(styles)(IsAuthenticated);
