import React, { useContext } from 'react';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import gamemodes from '@config/gamemodes';
import Class from '@webapp/Views/PickupQueue/Classes/Class';
import { Keys } from '@utils/types';
import classes from '@config/classes';
import { Container } from '@webapp/components/Grid';
import withStyles, { WithStyles } from 'react-jss';

interface OwnProps {
  gamemode: keyof typeof gamemodes,
}

const styles = {
  classesContainer: {
    display: 'grid',
    padding: 32,
    gridTemplateRows(props: OwnProps) {
      switch (props.gamemode) {
        case 'bball':
        case 'ultiduo':
        case '6v6':
          return '1fr';
        case '9v9':
          return '1fr 1fr 1fr';
        default:
          return '1fr';
      }
    },

    gridGap: 16,

    gridTemplateColumns(props: OwnProps) {
      const s = 'minmax(240px, 360px)';
      switch (props.gamemode) {
        case '9v9':
          return s.repeat(3);
        case '6v6':
          return s.repeat(5);
        case 'bball':
        case 'ultiduo':
          return s.repeat(2);
        default:
          return s;
      }
    },
  },
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function Classes(props: Props) {
  const gamemode = useContext(GamemodeContext);
  const slots = Object.keys(gamemodes[gamemode].slots) as Keys<typeof classes>;

  return (
    <Container className={props.classes.classesContainer}>
      {slots.map(className => (
        <Class
          key={className}
          className={className}
        />
      ))}
    </Container>
  );
}

export default withStyles(styles)(Classes);
