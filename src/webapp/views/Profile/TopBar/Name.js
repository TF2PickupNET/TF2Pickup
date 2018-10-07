// @flow

import React from 'react';
import injectSheet from 'react-jss';

import UserItem from '../../../components/UserItem';

type Props = {
  userId: string,
  classes: { name: string },
};

const styles = {
  name: {
    fontSize: '24px',
    lineHeight: '32px',
  },
};

function Name(props: Props) {
  return (
    <UserItem
      className={props.classes.name}
      userId={props.userId}
      color={null}
    />
  );
}

export default injectSheet(styles)(Name);
