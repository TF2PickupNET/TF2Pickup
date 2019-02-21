import { useEffect } from 'react';
import {
  State,
  useMakeMapState,
} from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { makeGetLastPickup } from '@webapp/store/users/selectors';

const makeMapState = () => {
  const getLastPickupId = makeGetLastPickup();

  return (state: State) => {
    return { lastPickupId: getLastPickupId(state, getCurrentUserId(state)) };
  };
};

function LastPickupLoader() {
  const { lastPickupId } = useMakeMapState(makeMapState);

  useEffect(() => {
    // TODO: Fetch pickup here
  }, [lastPickupId]);

  return null;
}

export default LastPickupLoader;
