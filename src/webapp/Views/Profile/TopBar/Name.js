// @flow

import React from 'react';
import injectSheet from 'react-jss';

import UserItem from '../../../components/UserItem';
import { useMatch } from '../../../utils/use-router';

type Props = { classes: { name: string } };

const styles = {
  name: {
    fontSize: '24px',
    lineHeight: '32px',
  },
};

function Name(props: Props) {
  const userId = useMatch(match => match.params.userId);

  return (
    <UserItem
      className={props.classes.name}
      userId={userId}
      color={null}
    />
  );
}

export default injectSheet(styles)(Name);
