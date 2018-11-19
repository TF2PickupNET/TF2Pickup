// @flow

import React, { useCallback } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import {
  Menu,
  Layout,
} from 'antd';

import { gamemodes } from '../../../../config';
import { useLocation } from '../../../utils/use-router';
import { useMakeMapState } from '../../../utils/use-store';
import { makeGetLastPickup } from '../../../store/users/selectors';
import { getCurrentUserId } from '../../../store/user-id/selectors';

type Props = { classes: { menu: string } };

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

const makeMapState = () => {
  const getLastPickupId = makeGetLastPickup();

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      userId,
      lastPickupId: getLastPickupId(state, userId),
    };
  };
};

function Sidebar(props: Props) {
  const location = useLocation();
  const handleItemClick = useCallback((options: { key: string }) => {
    if (options.key === 'logout') {
      this.props.logout();
    }
  }, []);
  const {
    userId,
    lastPickupId,
  } = useMakeMapState(makeMapState);

  return (
    <Sider width={SIDEBAR_WIDTH}>
      <Menu
        theme="light"
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

        {userId !== null && (
          <React.Fragment>
            {lastPickupId !== null && (
              <Menu.Item key={`/pickup/${lastPickupId}`}>
                <Link to={`/pickup/${lastPickupId}`}>
                  Last Pickup
                </Link>
              </Menu.Item>
            )}

            <Menu.Item key="/settings">
              <Link to="/settings">
                Settings
              </Link>
            </Menu.Item>

            <Menu.Item key={`/profile/${userId}`}>
              <Link to="/profile">
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item key="logout">
              Logout
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu>
    </Sider>
  );
}

export { SIDEBAR_WIDTH };

export default injectSheet(styles)(Sidebar);
