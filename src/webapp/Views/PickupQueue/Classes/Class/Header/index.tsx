import React, { useContext } from 'react';
import classes from '@config/classes';
import { capitalize } from '@utils/string';
import Icon from './Icon';
import withStyles, { WithStyles } from 'react-jss';
import { makeGetPlayerIdsForClass } from '@webapp/store/pickup-queues/selectors';
import { State, useMakeMapState } from '@webapp/store';
import gamemodes from '@config/gamemodes';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { Container } from '@webapp/components/Grid';
import theme from '@webapp/theme';

const styles = {
  headerContainer: {
    height: 48,
    borderBottom: `1px solid ${theme.divider}`,
    boxSizing: 'border-box',
    padding: 8,
  },

  title: {
    display: 'inline',
    margin: 0,
  },

  playerCount: {
    composes: '$title',
    flex: 1,
    marginLeft: 6,
    color: theme.textColor.secondary.light,
  },
};

const makeMapState = () => {
  const getPlayerIdsForClass = makeGetPlayerIdsForClass();

  return (state: State, gamemode: keyof typeof gamemodes, className: keyof typeof classes) => {
    return { playerCount: getPlayerIdsForClass(state, gamemode, className).length };
  };
};

interface Props extends WithStyles<typeof styles> {
  className: keyof typeof classes,
}

function ClassHeader(props: Props) {
  const gamemode = useContext(GamemodeContext);
  const { playerCount } = useMakeMapState(makeMapState, gamemode, props.className);

  return (
    <Container
      align="center"
      className={props.classes.headerContainer}
    >
      <h3 className={props.classes.title}>
      {capitalize(props.className)}
      </h3>

      <h5 className={props.classes.playerCount}>
        ({playerCount}/{gamemodes[gamemode].slots[props.className]})
      </h5>

      <Icon className={props.className} />
    </Container>
  );
}

export default withStyles(styles)(ClassHeader);
