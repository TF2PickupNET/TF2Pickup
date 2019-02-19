import React, { useCallback, useContext } from 'react';
import { Item } from '@webapp/components/PageNavigation';
import maps from '@config/maps';
import { useActions } from '@webapp/store';
import { selectMap } from '@webapp/store/pickup-queues/actions';
import { GamemodeContext } from '@webapp/Views/PickupQueue';

interface Props {
  map: keyof typeof maps,
}

function Map(props: Props) {
  const isInPickup = true;
  const gamemode = useContext(GamemodeContext);
  const actions = useActions({ selectMap });
  const handleClick = useCallback(() => {
    if (isInPickup) {
      actions.selectMap(gamemode, props.map);
    }
  }, [gamemode, props.map, isInPickup]);

  return (
    <Item
      text={maps[props.map].display}
      isActive={false}
      onClick={handleClick}
    />
  );
}

export default Map;
