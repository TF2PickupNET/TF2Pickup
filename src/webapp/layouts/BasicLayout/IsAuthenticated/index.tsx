import React, {
  useState,
  ReactNode,
} from 'react';
import injectSheet, { Classes } from 'react-jss';
import Button from '@atlaskit/button';
import { Redirect } from 'react-router-dom';

import { Row } from '../../../components/Grid';
import { State } from '../../../store';
import { redirectToSteamAuth } from '../../../utils/auth';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { useMapState } from '../../../store/use-store';
import useActions from '../../../store/use-actions';
import { loginUser } from '../../../store/user-id/actions';
import useAsyncEffect from "../../../utils/use-async-effect";
import DocumentTitle from "../../../components/DocumentTitle";
import { useLocation } from '../../../utils/use-router';

const styles = {
  container: { minHeight: '100vh' },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
};

function handleClick() {
  redirectToSteamAuth();
}

const mapState = (state: State) => {
  return { userId: getCurrentUserId(state) };
};

interface Props extends Classes<typeof styles> {
  children: ReactNode
}

function IsAuthenticated(props: Props) {
  const { userId } = useMapState(mapState);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const actions = useActions({ authenticate: loginUser });
  const location = useLocation();

  useAsyncEffect(() => actions.authenticate(), () => {
    setIsAuthenticating(false);
  });

  if (location.pathname === '/sign-out') {
    return (
      <Redirect to="/" />
    );
  }

  if (userId === null) {
    return (
      <Row
        dir="column"
        justify="center"
        align="center"
        className={props.classes.container}
      >
        <DocumentTitle title="Not Authenticated" />

        <h2 className={props.classes.text}>
          {isAuthenticating ? 'Authenticating...' : 'You need to login'}
        </h2>

        <Button
          isDisabled={isAuthenticating}
          onClick={handleClick}
        >
          Login with Steam
        </Button>
      </Row>
    );
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default injectSheet<Props>(styles)(IsAuthenticated);
