import React, { ReactNode } from 'react';

import NotificationRequester from '../../components/NotificationRequester';
import SoundFix from '../../components/SoundFix';
import SteamLoginToken from '../../components/SteamLoginToken';

import Page from './Page';

type Props = { children: ReactNode };

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
