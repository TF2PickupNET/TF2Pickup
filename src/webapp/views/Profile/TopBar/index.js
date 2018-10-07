// @flow

import React from 'react';
import { Card } from 'antd';
import injectSheet from 'react-jss';

import Roles from './Roles';
import Name from './Name';
import UserAvatar from './Avatar';

type Props = {
  userId: string,
  classes: { topBar: string },
};

const styles = {
  topBar: {
    '& > .ant-card-body': {
      padding: 0,
      display: 'flex',
      width: '100%',
    },
  },

  infoContainer: {
    padding: '8px 16px',
  },
};

function TopBar(props: Props) {
  return (
    <Card className={props.classes.topBar}>
      <UserAvatar userId={props.userId} />

      <div className={props.classes.infoContainer}>
        <Name userId={props.userId} />

        <Roles userId={props.userId} />
      </div>
    </Card>
  );
}

export default injectSheet(styles)(TopBar);