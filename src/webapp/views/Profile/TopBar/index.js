// @flow

import React from 'react';
import { Card } from 'antd';
import injectSheet from 'react-jss';

import Roles from './Roles';
import Name from './Name';
import UserAvatar from './UserAvatar';
import Region from './Region';

type Props = {
  classes: {
    topBar: string,
    infoContainer: string,
  },
};

const styles = {
  topBar: {
    '& > .ant-card-body': {
      padding: 0,
      display: 'flex',
      width: '100%',
    },
  },

  infoContainer: { padding: '8px 16px' },
};

function TopBar(props: Props) {
  return (
    <Card className={props.classes.topBar}>
      <UserAvatar />

      <div className={props.classes.infoContainer}>
        <Name />

        <Roles />

        <Region />
      </div>
    </Card>
  );
}

export default injectSheet(styles)(TopBar);
