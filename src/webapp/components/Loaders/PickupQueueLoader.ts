import { useEffect } from 'react';
import {
  useActions,
  State,
  useMakeMapState,
} from '@webapp/store';
import { fetchQueue } from '@webapp/store/queues/actions';
import { getCurrentRegion } from '@webapp/store/user-id/selectors';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

const makeMapState = () => {
  return (state: State) => {
    return { region: getCurrentRegion(state) };
  };
};

function PickupQueueLoader() {
  const actions = useActions({ fetchPickupQueue: fetchQueue });
  const { region } = useMakeMapState(makeMapState);

  useEffect(() => {
    gamemodeKeys.forEach((key) => {
      actions.fetchPickupQueue(key);
    });
  }, [region]);

  return null;
}

export default PickupQueueLoader;
