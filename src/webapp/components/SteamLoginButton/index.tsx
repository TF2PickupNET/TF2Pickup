import React, { useCallback } from 'react';
import Button from '@atlaskit/button';

import { redirectToSteamAuth } from '../../utils/auth';

function SteamLoginButton() {
  const handleClick = useCallback(() => {
    redirectToSteamAuth();
  }, []);

  return (
    <Button onClick={handleClick}>
      Login with Steam
    </Button>
  );
}

export default SteamLoginButton;
