import React from 'react';
import gamemodes from '@config/gamemodes';

import Navigation from './Navigation';

interface Props {
  gamemode: keyof typeof gamemodes,
  path: string,
}

export const GamemodeContext = React.createContext<keyof typeof gamemodes>('6v6');

function PickupQueue(props: Props) {
  return (
    <GamemodeContext.Provider value={props.gamemode}>
    <Navigation />
    </GamemodeContext.Provider>
  );
}

export default PickupQueue;
