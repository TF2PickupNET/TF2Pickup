import React, { ReactNode } from 'react';

import IsConnected from './IsConnected';
import BrowserValidator from './BrowserValidator';
import LoadingScreen from './LoadingScreen';
import VersionValidator from './VersionValidator';
import IsAuthenticated from './IsAuthenticated';
import SignUpScreen from './SignUpScreen';

interface Props {
  children: ReactNode,
}

function Page(props: Props) {
  return (
    <IsConnected>
      <BrowserValidator>
        <IsAuthenticated>
          <LoadingScreen>
            <VersionValidator>
              <SignUpScreen>
                {props.children}
              </SignUpScreen>
            </VersionValidator>
          </LoadingScreen>
        </IsAuthenticated>
      </BrowserValidator>
    </IsConnected>
  );
}

export default Page;
