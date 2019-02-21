import React, { ReactNode } from 'react';
import { Row } from '@webapp/components/Grid';
import GlobalNavigation from '@webapp/components/GlobalNavigation';
import NotificationRequester from '@webapp/components/NotificationRequester';
import Notifications from '@webapp/components/Notifications';
import SoundFix from '@webapp/components/SoundFix';
import Page from '@webapp/Layout/Page';

interface Props {
  children: ReactNode,
}

function Layout(props: Props) {
  return (
    <React.Fragment>
      <SoundFix />

      <NotificationRequester />

      <Notifications />

      <Row>
        <GlobalNavigation />

        <Page>
          {props.children}
        </Page>
      </Row>
    </React.Fragment>
  );
}

export default Layout;
