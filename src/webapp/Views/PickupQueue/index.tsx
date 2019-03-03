import React from 'react';
import gamemodes from '@config/gamemodes';
import withStyles, { WithStyles } from 'react-jss';

import Navigation from './Navigation';
import Content from './Content';
import { Container } from '@webapp/components/Grid';
import RunningPickupBanner from '@webapp/components/RunningPickupBanner';

const styles = {
  container: {
    minHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'scroll',
    flex: 1,
  },
};

interface Props extends WithStyles<typeof styles> {
  gamemode: keyof typeof gamemodes,
  path: string,
}

export const GamemodeContext = React.createContext<keyof typeof gamemodes>('6v6');

function PickupQueue(props: Props) {
  return (
    <GamemodeContext.Provider value={props.gamemode}>
      <Navigation />

      <Container
        dir="column"
        className={props.classes.container}
      >
        <RunningPickupBanner />

        <Content />
      </Container>
    </GamemodeContext.Provider>
  );
}

export default withStyles(styles)(PickupQueue);
