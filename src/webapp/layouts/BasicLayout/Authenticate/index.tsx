import React, {
  useState,
  useEffect,
  ReactNode,
} from 'react';

import store from '../../../store';
import { loginUser } from '../../../store/user-id/actions';
import { fetchUser } from '../../../store/users/actions';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { fetchSettings } from '../../../store/settings/actions';
import { fetchProfile } from '../../../store/user-profiles/actions';
import DocumentTitle from '../../../components/DocumentTitle';

interface Props {
  children: ReactNode,
}

function Authenticate(props: Props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = async () => {
    const error = await store.dispatch(loginUser());
    const userId = getCurrentUserId(store.getState());

    if (error === null && userId !== null) {
      await Promise.all([
        store.dispatch(fetchUser(userId)),
        store.dispatch(fetchSettings()),
        store.dispatch(fetchProfile(userId)),
      ]);
    }

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
