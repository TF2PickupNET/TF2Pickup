import React, { useContext } from 'react';
import { makeGetQueueItem } from '@webapp/store/queues/selectors';
import Spinner from '@atlaskit/spinner';
import { State, useMakeMapState, AsyncStatus } from '@webapp/store';
import gamemodes from '@config/gamemodes';
import { Column, Container } from '@webapp/components/Grid';
import withStyles, { WithStyles } from 'react-jss';
import Classes from '@webapp/Views/PickupQueue/Classes';
import { GamemodeContext } from '@webapp/Views/PickupQueue/index';

const styles = {
  spinnerContainer: {
    marginTop: 120,
  },

  errorContainer: {
    marginTop: 120,
  },
};

const makeMapState = () => {
  const getQueue = makeGetQueueItem();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return { queue: getQueue(state, gamemode) };
  };
};

type Props = WithStyles<typeof styles>;

const Content = (props: Props) => {
  const gamemode = useContext(GamemodeContext);
  const { queue } = useMakeMapState(makeMapState, gamemode);

  switch (queue.status) {
    case AsyncStatus.NOT_STARTED:
    case AsyncStatus.LOADING:
      return (
        <span className={props.classes.spinnerContainer}>
          <Spinner />
        </span>
      );
    case AsyncStatus.FETCHED:
      return (
        <Container dir="column">
          <Classes gamemode={gamemode} />
        </Container>
      );
    case AsyncStatus.ERROR:
      return (
        <Column col={16} className={props.classes.errorContainer}>
          <h3>
            An error occurred while fetching {gamemodes[gamemode].display} pickup queue:
            {queue.error.name}
          </h3>

          <span>
            {queue.error.message}
          </span>
        </Column>
      );
    default:
      return null;
  }
};

export default withStyles(styles)(Content);
