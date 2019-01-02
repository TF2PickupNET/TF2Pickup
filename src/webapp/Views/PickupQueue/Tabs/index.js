// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Tabs } from 'antd';

import { gamemodes } from '../../../../config';

type Props = {
  pathname: string,
  classes: {
    tabBar: string,
    link: string,
  },
};

const gamemodeNames = Object.keys(gamemodes);
const styles = {
  tabBar: {
    '& .ant-tabs-nav': {
      display: 'flex',

      '& > div': {
        flex: 1,
        display: 'flex',

        '& > .ant-tabs-tab': { flex: 1 },
      },
    },
  },

  link: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
  },
};

function TabsContainer(props: Props) {
  const activeGamemode = props.pathname.slice(1);

  return (
    <Tabs
      activeKey={activeGamemode}
      tabBarGutter={0}
      className={props.classes.tabBar}
    >
      {gamemodeNames.map(gamemode => (
        <Tabs.TabPane
          key={gamemode}
          tab={(
            <Link
              className={props.classes.link}
              to={`/${gamemode}`}
            >
              {gamemodes[gamemode].display}
            </Link>
          )}
        />
      ))}
    </Tabs>
  );
}

export default injectSheet(styles)(TabsContainer);
