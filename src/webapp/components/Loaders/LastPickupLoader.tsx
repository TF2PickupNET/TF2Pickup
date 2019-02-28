import { useEffect } from 'react';
import {
  State,
  useMakeMapState,
  useActions,
} from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { makeGetLastPickup } from '@webapp/store/users/selectors';
import { fetchPickup } from '@webapp/store/pickups/actions';

const makeMapState = () => {
  const getLastPickupId = makeGetLastPickup();

  return (state: State) => {
    return { lastPickupId: getLastPickupId(state, getCurrentUserId(state)) };
  };
};

function LastPickupLoader() {
  const { lastPickupId } = useMakeMapState(makeMapState);
  const actions = useActions({ fetchPickup });

  useEffect(() => {
    if (lastPickupId !== null) {
      actions.fetchPickup(lastPickupId);
    }
  }, [lastPickupId]);

  return null;
}

export default LastPickupLoader;
