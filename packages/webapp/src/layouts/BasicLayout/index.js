// @flow

import React from 'react';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';

export default function BasicLayout() {
  return (
    <IsConnected>
      <LoadingScreen>
        <IsAuthenticated>
          <SignUpScreen>
            Hello World
          </SignUpScreen>
        </IsAuthenticated>
      </LoadingScreen>
    </IsConnected>
  );
}
