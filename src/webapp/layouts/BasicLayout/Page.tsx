import React, { ReactNode } from 'react';

import IsConnected from './IsConnected';
import BrowserValidator from './BrowserValidator';
import LoadingScreen from './LoadConfig';
import VersionValidator from './VersionValidator';
import Authenticate from './Authenticate';
import SignUpScreen from './SignUpScreen';

interface Props {
  children: ReactNode,
}

function Page(props: Props) {
  return (
    <IsConnected>
      <BrowserValidator>
        <Authenticate>
          <LoadingScreen>
            <VersionValidator>
              <SignUpScreen>
                {props.children}
              </SignUpScreen>
            </VersionValidator>
          </LoadingScreen>
        </Authenticate>
      </BrowserValidator>
    </IsConnected>
  );
}

export default Page;
