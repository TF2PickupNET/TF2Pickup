import React, { useCallback, useContext } from 'react';
import classes from '@config/classes';
import AddIcon from '@atlaskit/icon/glyph/add';
import { useActions, State, useMakeMapState } from '@webapp/store';
import { joinPickupQueue, leavePickupQueue } from '@webapp/store/pickup-queues/actions';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { makeGetPlayerByUserId } from '@webapp/store/pickup-queues/selectors';
import gamemodes from '@config/gamemodes';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  iconContainer: {
    cursor: 'pointer',
    display: 'inline',
    height: 24,
  },
};

interface Props extends WithStyles<typeof styles> {
  className: keyof typeof classes,
}

const makeMapState = () => {
  const getPlayerByUserId = makeGetPlayerByUserId();

  return (state: State, gamemode: keyof typeof gamemodes, className: keyof typeof classes) => {
    const player = getPlayerByUserId(state, gamemode, getCurrentUserId(state));

    return { isInClass: player !== null && player.class === className };
  };
};

function Icon(props: Props) {
  const gamemode = useContext(GamemodeContext);
  const { isInClass } = useMakeMapState(makeMapState, gamemode, props.className);
  const actions = useActions({
    joinPickupQueue,
    leavePickupQueue,
  });
  const handleClick = useCallback(() => {
    if (isInClass) {
      actions.leavePickupQueue(gamemode);
    } else {
      actions.joinPickupQueue(gamemode, props.className);
    }
  }, [gamemode, props.className, isInClass]);

  return (
    <span
      className={props.classes.iconContainer}
      onClick={handleClick}
    >
      {isInClass ? (
        <CrossIcon label="Leave" />
      ) : (
        <AddIcon label="Join" />
      )}
    </span>
  );
}

export default withStyles(styles)(Icon);
