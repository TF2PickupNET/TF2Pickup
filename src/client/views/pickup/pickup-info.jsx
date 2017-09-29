import React from 'react';
import injectSheet from 'react-jss';
import {
  Button,
  Card,
  breakpoints,
} from 'materialize-react';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import statuses from '@tf2-pickup/configs/pickup-status';

export function GamemodeInfo({
  classes,
  pickup,
  isInPickup,
}) {
  const playerCount = Object
    .keys(pickup.classes)
    .reduce((total, className) => {
      const max = gamemodes[pickup.gamemode].slots[className];

      return total + Math.min(pickup.classes[className].length, max);
    }, 0);

  return (
    <Card
      className={classes.container}
      data-gamemode={pickup.gamemode}
    >
      <span className={classes.item}>
        Status: {statuses[pickup.status].display}
      </span>

      <span className={classes.item}>
        <Button disabled={!isInPickup}>
          Vote for map
        </Button>
      </span>

      <span className={classes.item}>
        Players: {playerCount} / {gamemodes[pickup.gamemode].maxPlayers}
      </span>
    </Card>
  );
}

GamemodeInfo.styles = {
  container: {
    display: 'flex',
    height: 64,
    padding: '8px 0',
    marginBottom: 24,
    width: '100%',
    boxSizing: 'border-box',

    [breakpoints.up('desktop')]: {
      '&[data-gamemode="6v6"]': { maxWidth: 400 * 4 + 3 * 16 },

      '&[data-gamemode="9v9"]': { maxWidth: 400 * 3 + 2 * 16 },

      '&[data-gamemode="bball"], &[data-gamemode="ultiduo"]': { maxWidth: 400 * 2 + 16 },
    },
  },

  item: {
    padding: '0 16px',
    height: 48,
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default injectSheet(GamemodeInfo.styles)(GamemodeInfo);
