// @flow

import React from 'react';
import { List } from 'antd';
import injectSheet from 'react-jss';

import { makeGetServiceLinks } from '../../../store/user-profiles/selectors';
import { useMakeMapState } from '../../../store/use-store';
import { useMatch } from '../../../utils/use-router';

import ListItem from './ListItem';

const styles = {
  sidebar: { width: 160 },

  avatar: {
    height: 160,
    width: 160,
  },
};

const makeMapState = () => {
  const getLinks = makeGetServiceLinks();

  return (state, userId) => {
    return { links: getLinks(state, userId) };
  };
};

function Links() {
  const userId = useMatch(match => match.params.userId, null);
  const { links } = useMakeMapState(makeMapState, userId);

  console.log(links);

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
