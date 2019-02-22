import React, { useCallback } from 'react';
import Banner from '@atlaskit/banner';
import { makeGetLastPickup } from '@webapp/store/users/selectors';
import { State, useMakeMapState } from '@webapp/store';
import { navigate } from '@reach/router';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import Button from '@atlaskit/button';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  button: {
    marginLeft: 16,
  },
};

const makeMapState = () => {
  const getLastPickupId = makeGetLastPickup();

  return (state: State) => {
    const pickupId = getLastPickupId(state, getCurrentUserId(state));

    return {
      pickupId,
      // TODO: Get pickup from store and check the status
      isRunning: true,
    };
  };
};

type Props = WithStyles<typeof styles>;

function RunningPickupBanner(props: Props) {
  const { isRunning, pickupId } = useMakeMapState(makeMapState);
  const handleButtonClick = useCallback(() => {
    if (pickupId !== null) {
      navigate(`/pickup/${pickupId}`);
    }
  }, [pickupId]);

  return (
    <Banner
      isOpen={isRunning && pickupId !== null}
      appearance="announcement"
    >
      You are in an active pickup

      <Button
        isSelected
        className={props.classes.button}
        onClick={handleButtonClick}
      >
        Go to pickup
      </Button>
    </Banner>
  );
}

export default withStyles(styles)(RunningPickupBanner);
