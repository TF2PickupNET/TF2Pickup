import { useEffect } from 'react';
import { useActions, State, useMapState } from '@webapp/store';
import { loginUser } from '@webapp/store/user-id/actions';
import { getIsConnected } from '@webapp/store/connection/selectors';

const mapState = (state: State) => {
  return { isConnected: getIsConnected(state) };
};

function Authenticator() {
  const actions = useActions({ loginUser });
  const { isConnected } = useMapState(mapState);

  useEffect(() => {
    if (isConnected) {
      actions.loginUser();
    }
  }, [isConnected]);

  return null;
}

export default Authenticator;
