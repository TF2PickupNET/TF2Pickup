// @flow

import React, { type Node } from 'react';
import { Layout } from 'antd';
import Helmet from 'react-helmet';

import favicon from '../../../../assets/images/favicon.ico';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';
import VersionValidator from './VersionValidator';
import CookieNotification from './CookieNotification';
import NotificationRequester from './NotificationRequester';
import BrowserValidator from './BrowserValidator';
import SoundFix from './SoundFix';

type Props = { children: Node };

export default class BasicLayout extends React.PureComponent<Props> {
  renderPage() {
    return (
      <IsConnected>
        <BrowserValidator>
          <LoadingScreen>
            <VersionValidator>
              <IsAuthenticated>
                <SignUpScreen>
                  {this.props.children}
                </SignUpScreen>
              </IsAuthenticated>
            </VersionValidator>
          </LoadingScreen>
        </BrowserValidator>
      </IsConnected>
    );
  }

  render() {
    return (
      <Layout>
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

        {this.renderPage()}
      </Layout>
    );
  }
}
