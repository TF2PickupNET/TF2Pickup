// @flow

import React from 'react';

import IsConnected from './IsConnected';
import IsAuthenticated from './IsAuthenticated';
import LoadingScreen from './LoadingScreen';

export default function BasicLayout() {
  return (
    <IsConnected>
      <LoadingScreen>
        <IsAuthenticated>
          Hello
        </IsAuthenticated>
      </LoadingScreen>
    </IsConnected>
  );
}
