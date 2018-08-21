// @flow

import React, { type Node } from 'react';
import { Layout } from 'antd';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';
import VersionValidator from './VersionValidator';
import CookieNotification from './CookieNotification';
import NotificationRequester from './NotificationRequester';

type Props = { children: Node };

export default function BasicLayout(props: Props) {
  return (
    <Layout>
      <CookieNotification />

      <NotificationRequester />

      <IsConnected>
        <LoadingScreen>
          <VersionValidator>
            <IsAuthenticated>
              <SignUpScreen>
                {props.children}
              </SignUpScreen>
            </IsAuthenticated>
          </VersionValidator>
        </LoadingScreen>
      </IsConnected>
    </Layout>
  );
}
