// @flow

import React from 'react';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';
import VersionValidator from './VersionValidator';

export default function BasicLayout(props) {
  return (
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
  );
}
