import React from 'react';
import { makeGetPickupQueueItem } from '@webapp/store/pickup-queues/selectors';
import Spinner from '@atlaskit/spinner';
import { State, useMakeMapState, AsyncStatus } from '@webapp/store';
import gamemodes from '@config/gamemodes';
import { Column } from '@webapp/components/Grid';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  spinnerContainer: {
    marginTop: 120,
  },

  errorContainer: {
    marginTop: 120,
  },
};

interface Props extends WithStyles<typeof styles> {
  gamemode: keyof typeof gamemodes,
}

const makeMapState = () => {
  const getPickupQueuue = makeGetPickupQueueItem();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return { queue: getPickupQueuue(state, gamemode) };
  };
};

const Content = (props: Props) => {
  const { queue } = useMakeMapState(makeMapState, props.gamemode);

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
        <div>
          
        </div>
      );
    case AsyncStatus.ERROR:
      return (
        <Column col={16} className={props.classes.errorContainer}>
          <h3>
            An error occurred while fetching {gamemodes[props.gamemode].display} pickup queue:
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
