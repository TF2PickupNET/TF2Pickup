import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';

import { State } from '../../store';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMapState } from '../../store/use-store';
import { Row } from '../Grid';
import SteamLoginButton from '../SteamLoginButton';

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
