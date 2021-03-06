import React, { ReactNode } from 'react';
import SteamLoginToken from '@webapp/components/SteamLoginToken';
import BrowserValidator from '@webapp/components/BrowserValidator';
import IsConnected from '@webapp/components/IsConnected';
import VersionValidator from '@webapp/components/VersionValidator';
import SignUpScreen from '@webapp/components/SignUpScreen';
import LoadingScreen from '@webapp/components/LoadingScreen';

interface Props {
  children: ReactNode,
}

function Page(props: Props) {
  return (
    <SteamLoginToken>
      <BrowserValidator>
        <IsConnected>
          <LoadingScreen>
            <VersionValidator>
              <SignUpScreen>
                {props.children}
              </SignUpScreen>
            </VersionValidator>
          </LoadingScreen>
        </IsConnected>
      </BrowserValidator>
    </SteamLoginToken>
  );
}

export default Page;
