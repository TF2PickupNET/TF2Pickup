import React, {
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { useActions } from '../../../store';
import { loginUser } from '../../../store/user-id/actions';
import DocumentTitle from '../../../components/DocumentTitle';

interface Props {
  children: ReactNode,
}

function Authenticate(props: Props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const actions = useActions({ loginUser });
  const auth = async () => {
    await actions.loginUser();

    setIsAuthenticating(false);
  };

  useEffect(() => {
    auth();
  }, []);

  if (isAuthenticating) {
    return (
      <React.Fragment>
        <DocumentTitle title="Authenticating..." />

        <p>
          Authenticating...
        </p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default Authenticate;
