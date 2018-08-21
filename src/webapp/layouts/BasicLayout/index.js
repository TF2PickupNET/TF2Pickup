// @flow

import React, { type Node } from 'react';
import { Layout } from 'antd';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';
import VersionValidator from './VersionValidator';

type Props = { children: Node };

export default function BasicLayout(props: Props) {
  return (
    <Layout>
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
