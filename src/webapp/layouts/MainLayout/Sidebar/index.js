// @flow

import React, { useCallback } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import {
  Menu,
  Layout,
} from 'antd';

import { gamemodes } from '../../../../config';
import useLocation from '../../../utils/use-location';

import UserSection from './UserSection';

type Props = {
  classes: { menu: string },
};

const SIDEBAR_WIDTH = 256;
const { Sider } = Layout;

const styles = { menu: { height: '100%' } };

const gamemodeItems = Object.keys(gamemodes).map(name => (
  <Menu.Item key={`/${name}`}>
    <Link to={`/${name}`}>
      {gamemodes[name].display}
    </Link>
  </Menu.Item>
));

function Sidebar(props: Props) {
  const location = useLocation();
  const handleItemClick = useCallback((options: { key: string }) => {
    if (options.key === 'logout') {
      this.props.logout();
    }
  }, []);

  return (
    <Sider width={SIDEBAR_WIDTH}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className={props.classes.menu}
        onClick={handleItemClick}

      >
        <Menu.ItemGroup title="Pickups">
          {gamemodeItems}
        </Menu.ItemGroup>

        <Menu.Divider />

        <Menu.Divider />

        <UserSection />
      </Menu>
    </Sider>
  );
}

export { SIDEBAR_WIDTH };

export default injectSheet(styles)(Sidebar);
