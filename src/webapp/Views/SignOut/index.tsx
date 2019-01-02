import React, { useState } from 'react';
import Spinner from '@atlaskit/spinner';
import { Redirect } from 'react-router-dom';

import useActions from '../../store/use-actions';
import { logoutUser } from '../../store/user-id/actions';
import { Row } from '../../components/Grid';
import useAsyncEffect from '../../utils/use-async-effect';

function SignOut() {
  const actions = useActions({ logOut: logoutUser });
  const [isSigningOut, setIsSigningOut] = useState(true);

  useAsyncEffect(() => actions.logOut(), () => {
    setIsSigningOut(false);
  });

  if (isSigningOut) {
    return (
      <Row
        justify="center"
        align="center"
      >
        <Spinner />
      </Row>
    );
  }

  return (
    <Redirect to="/" />
  );
}

export default SignOut;
