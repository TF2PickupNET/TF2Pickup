import React, { useCallback, useContext } from 'react';
import { Item } from '@webapp/components/PageNavigation';
import maps from '@config/maps';
import { useActions, State, useMakeMapState } from '@webapp/store';
import { selectMap } from '@webapp/store/queues/actions';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { makeGetPlayerByUserId } from '@webapp/store/queues/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import gamemodes from '@config/gamemodes';

interface Props {
  map: keyof typeof maps,
}

const makeMapState = () => {
  const getPlayerByUserId = makeGetPlayerByUserId();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    const player = getPlayerByUserId(state, gamemode, getCurrentUserId(state));

    return {
      isInPickup: player !== null,
      map: player === null ? null : player.map,
    };
  };
};

function Map(props: Props) {
  const gamemode = useContext(GamemodeContext);
  const {
    isInPickup,
    map,
  } = useMakeMapState(makeMapState, gamemode);

  const actions = useActions({ selectMap });
  const handleClick = useCallback(() => {
    if (isInPickup && props.map !== map) {
      actions.selectMap(gamemode, props.map);
    }
  }, [gamemode, props.map, isInPickup]);

  return (
    <Item
      text={maps[props.map].display}
      isActive={props.map === map}
      onClick={handleClick}
    />
  );
}

export default Map;
