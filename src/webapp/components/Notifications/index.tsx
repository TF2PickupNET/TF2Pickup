import React from 'react';
import { State, useMapState } from '@webapp/store';
import { getFirstThreeNotificationIds } from '@webapp/store/notifications/selectors';
import withStyles, { WithStyles } from 'react-jss';

import Notification from './Notification';

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    right: 30,
    display: 'flex',
    flexDirection: 'column',
  },
};

const mapState = (state: State) => {
  return { notificationIds: getFirstThreeNotificationIds(state) };
};

type Props = WithStyles<typeof styles>;

function Notifications(props: Props) {
  const { notificationIds } = useMapState(mapState);

  return (
    <div className={props.classes.container}>
      {notificationIds.map(notificationId => (
        <Notification
          key={notificationId}
          id={notificationId}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(Notifications);
