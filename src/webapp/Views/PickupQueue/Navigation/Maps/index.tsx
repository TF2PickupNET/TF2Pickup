import React, { useContext } from 'react';
import { GamemodeContext } from '../..';
import { makeGetPickupQueueMaps } from '@webapp/store/pickup-queues/selectors';
import { State, useMakeMapState } from '@webapp/store';
import gamemodes from '@config/gamemodes';
import { GroupHeading } from '@atlaskit/navigation-next';

import Map from './Map';

const makeMapState = () => {
  const getPickupQueueMaps = makeGetPickupQueueMaps();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return { maps: getPickupQueueMaps(state, gamemode) };
  };
};

function Maps() {
  const gamemode = useContext(GamemodeContext);
  const { maps } = useMakeMapState(makeMapState, gamemode);

  return (
    <React.Fragment>
      <GroupHeading>
        Maps
      </GroupHeading>

      {maps.map(map => (
        <Map
          key={map}
          map={map}
        />
      ))}
    </React.Fragment>
  );
}

export default Maps;
