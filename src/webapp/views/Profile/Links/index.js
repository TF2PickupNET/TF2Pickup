// @flow

import React from 'react';
import { List } from 'antd';
import injectSheet from 'react-jss';

import { makeGetServiceLinks } from '../../../store/user-profiles/selectors';
import { useMakeMapState } from '../../../utils/use-store';

import ListItem from './ListItem';

// eslint-disable-next-line react/no-unused-prop-types
type Props = { userId: string };

const styles = {
  sidebar: { width: 160 },

  avatar: {
    height: 160,
    width: 160,
  },
};

const makeMapState = () => {
  const getLinks = makeGetServiceLinks();

  return (state, props) => {
    return { links: getLinks(state, props.userId) };
  };
};

function Links(props: Props) {
  const { links } = useMakeMapState(makeMapState, props);

  return (
    <List
      bordered
      header="Links"
      style={{
        backgroundColor: '#ffffff',
        width: 160,
      }}
      dataSource={links}
      renderItem={ListItem}
    />
  );
}

export default injectSheet(styles)(Links);
