import React, { ReactNode } from 'react';
import { Row } from '@webapp/components/Grid';
import GlobalNavigation from '@webapp/components/GlobalNavigation';
import NotificationRequester from '@webapp/components/NotificationRequester';
import Notifications from '@webapp/components/Notifications';
import SoundFix from '@webapp/components/SoundFix';
import Page from '@webapp/Layout/Page';
import Loaders from '@webapp/components/Loaders';
import Authenticator from '@webapp/components/Authenticator';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  page: {
    height: '100vh',
  },
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function Layout(props: Props) {
  return (
    <React.Fragment>
      <SoundFix />

      <NotificationRequester />

      <Notifications />

      <Loaders />

      <Authenticator />

      <Row className={props.classes.page}>
        <GlobalNavigation />

        <Page>
          {props.children}
        </Page>
      </Row>
    </React.Fragment>
  );
}

export default withStyles(styles)(Layout);
