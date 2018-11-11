// @flow

import React, { type Node } from 'react';

import IsConnected from './IsConnected';
import BrowserValidator from './BrowserValidator';
import LoadingScreen from './LoadingScreen';
import VersionValidator from './VersionValidator';
import IsAuthenticated from './IsAuthenticated';
import SignUpScreen from './SignUpScreen';

type Props = { children: Node };

function Page(props: Props) {
  return (
    <IsConnected>
      <BrowserValidator>
        <LoadingScreen>
          <VersionValidator>
            <IsAuthenticated>
              <SignUpScreen>
                {props.children}
              </SignUpScreen>
            </IsAuthenticated>
          </VersionValidator>
        </LoadingScreen>
      </BrowserValidator>
    </IsConnected>
  );
}

export default Page;
