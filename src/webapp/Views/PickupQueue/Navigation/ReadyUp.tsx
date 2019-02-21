import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import AnimateHeight from 'react-animate-height';
import Button, { ButtonGroup } from '@atlaskit/button';
import { differenceInMilliseconds } from 'date-fns';
import gamemodes from '@config/gamemodes';
import {
  State,
  useMakeMapState, useActions,
} from '@webapp/store';
import {
  makeGetPickupQueueState,
  makeGetPickupQueueReadyUpEnd,
} from '@webapp/store/pickup-queues/selectors';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { Theme } from '@webapp/theme';
import withStyles, { WithStyles } from 'react-jss';
import {
  readyUp,
  leavePickupQueue,
} from '@webapp/store/pickup-queues/actions';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueState();
  const getPickupQueueReadyUpEnd = makeGetPickupQueueReadyUpEnd();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return {
      state: getPickupQueueStatus(state, gamemode),
      readyUpEnd: getPickupQueueReadyUpEnd(state, gamemode),
    };
  };
};

const styles = (theme: Theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 12,
      alignItems: 'center',
    },

    progressBar: {
      width: '80%',
      height: 4,
      margin: [12, 0],
      borderRadius: 2,
      position: 'relative',
      backgroundColor: theme.pageNavigation.darkBackgroundColor,
    },

    progressBarActive: {
      borderRadius: 2,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: theme.successColor,
      transition: 'transform 100ms',
      transform: 'scaleX(0.5)',
    },
  };
};

function useProgressState(gamemode: keyof typeof gamemodes, isReady: boolean, end: number) {
  const [progress, setProgress] = useState(0);
  const { readyUpTime } = gamemodes[gamemode];
  const updateProgress = () => {
    requestAnimationFrame(() => {
      const diff = differenceInMilliseconds(Date.now(), end);
      const newProgress = Math.max(0, Math.min(100, diff / readyUpTime * 100));

      setProgress(newProgress);

      if (newProgress < 100) {
        updateProgress();
      }
    });
  };

  useEffect(() => {
    setProgress(0);

    if (isReady) {
      updateProgress();
    }
  }, [isReady]);

  return progress;
}

type Props = WithStyles<typeof styles>;

function ReadyUp(props: Props) {
  const gamemode = useContext(GamemodeContext);
  const actions = useActions({
    readyUp,
    leavePickupQueue,
  });
  const { state } = useMakeMapState(makeMapState, gamemode);
  const isReadyUpState = state === 'ready-up';
  const progress = useProgressState(gamemode, isReadyUpState, 0);
  const handleReadyClick = useCallback(() => {
    actions.readyUp(gamemode);
  }, [gamemode]);
  const handleNotReadyClick = useCallback(() => {
    actions.leavePickupQueue(gamemode);
  }, [gamemode]);

  return (
    <AnimateHeight
      height={isReadyUpState ? 'auto' : 0}
      contentClassName={props.classes.container}
    >
      <h5>
        Are you ready to play?
      </h5>

      <span className={props.classes.progressBar}>
        <span
          className={props.classes.progressBarActive}
          style={{ transform: `scaleX(${progress}%)` }}
        />
      </span>

      <ButtonGroup>
        <Button onClick={handleReadyClick}>Yes</Button>
        <Button onClick={handleNotReadyClick}>No</Button>
      </ButtonGroup>
    </AnimateHeight>
  );
}

export default withStyles(styles)(ReadyUp);
