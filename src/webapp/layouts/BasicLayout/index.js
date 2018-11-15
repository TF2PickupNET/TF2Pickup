// @flow

import React, { type Node } from 'react';
import { Layout } from 'antd';
import Helmet from 'react-helmet';

import favicon from '../../../../assets/images/favicon.ico';
import CookieNotification from '../../components/CookieNotification';
import NotificationRequester from '../../components/NotificationRequester';
import SoundFix from '../../components/SoundFix';
import SteamLoginToken from '../../components/SteamLoginToken';

import Page from './Page';

type Props = { children: Node };

function BasicLayout(props: Props) {
  return (
    <Layout>
      <SteamLoginToken />

      <SoundFix />

      <CookieNotification />

      <NotificationRequester />

      <Helmet titleTemplate="%s | TF2Pickup">

        <link
          rel="shortcut icon"
          href={favicon}
          type="image/x-icon"
        />
      </Helmet>

      <Page>
        {props.children}
      </Page>
    </Layout>
  );
}

export default BasicLayout;
