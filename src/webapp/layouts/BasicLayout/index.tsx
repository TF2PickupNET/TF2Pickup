import React, { ReactNode } from 'react';

import NotificationRequester from '@webapp/components/NotificationRequester';
import SoundFix from '@webapp/components/SoundFix';
import SteamLoginToken from '@webapp/components/SteamLoginToken';

import Page from './Page';

interface Props {
  children: ReactNode,
}

function BasicLayout(props: Props) {
  return (
    <React.Fragment>
      <SoundFix />

      <NotificationRequester />

      <SteamLoginToken>
        <Page>
          {props.children}
        </Page>
      </SteamLoginToken>
    </React.Fragment>
  );
}

export default BasicLayout;
