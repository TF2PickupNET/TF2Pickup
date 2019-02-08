import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import {
  State,
  useMapState,
} from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { Row } from '@webapp/components/Grid';
import SteamLoginButton from '@webapp/components/SteamLoginButton';

const styles = {
  container: {
    flex: 1,
    padding: 32,
  },

  title: { marginBottom: 20 },
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

const mapState = (state: State) => {
  return { isLoggedIn: getCurrentUserId(state) !== null };
};

function RequireLogin(props: Props) {
  const { isLoggedIn } = useMapState(mapState);

  if (isLoggedIn) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  return (
    <Row
      justify="center"
      dir="column"
      align="center"
      className={props.classes.container}
    >
      <h4 className={props.classes.title}>
        Login to see your settings
      </h4>

      <SteamLoginButton />
    </Row>
  );
}

export default withStyles(styles)(RequireLogin);
