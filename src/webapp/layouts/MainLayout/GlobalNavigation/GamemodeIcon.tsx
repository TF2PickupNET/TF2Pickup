import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import gamemodes from '@config/gamemodes';

const styles = {
  icon: {
    display: 'inline-block',
    lineHeight: '32px',
    textAlign: 'center',
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
};

interface Props extends WithStyles<typeof styles> {
  gamemode: keyof typeof gamemodes,
}

function GamemodeIcon(props: Props) {
  return (
    <span className={props.classes.icon}>
      {gamemodes[props.gamemode].badgeText}
    </span>
  );
}

export default withStyles(styles)(GamemodeIcon);
