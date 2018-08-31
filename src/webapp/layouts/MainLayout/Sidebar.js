// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
  type MapDispatchToProps,
} from 'react-redux';
import { compose } from 'redux';
import {
  Link,
  withRouter,
  type Location,
} from 'react-router-dom';
import {
  Menu,
  Layout,
} from 'antd';

import { gamemodes } from '../../../config';
import { logoutUser } from '../../store/user-id/actions';
import { type State } from '../../store';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { makeGetLastPickup } from '../../store/users/selectors';

type Props = {
  lastPickup: null | number,
  userId: string | null,
  location: Location,
  logout: () => void,
  classes: { menu: string },
};

const SIDEBAR_WIDTH = 256;
const { Sider } = Layout;

const gamemodeKeys = Object.keys(gamemodes);
const styles = { menu: { height: '100%' } };

class Sidebar extends React.PureComponent<Props> {
  static renderGamemodeItems(): Node {
    return gamemodeKeys.map(name => (
      <Menu.Item key={`/${name}`}>
        <Link to={`/${name}`}>
          {gamemodes[name].display}
        </Link>
      </Menu.Item>
    ));
  }

  handleItemClick = (options) => {
    if (options.key === 'logout') {
      this.props.logout();
    }
  };

  renderUserItems() {
    if (this.props.userId === null) {
      return null;
    }

    return [
      <Menu.Item key="/settings">
        <Link to="/settings">
          Settings
        </Link>
      </Menu.Item>,

      <Menu.Item key={`/profile/${this.props.userId}`}>
        <Link to="/profile">
          Profile
        </Link>
      </Menu.Item>,

      <Menu.Item key="logout">
        Logout
      </Menu.Item>,
    ];
  }

  renderLastPickupItem() {
    if (this.props.lastPickup === null) {
      return null;
    }

    const path = `/pickup/${this.props.lastPickup}`;

    return (
      <Menu.Item key={path}>
        <Link to={path}>
          Last Pickup
        </Link>
      </Menu.Item>
    );
  }

  render() {
    return (
      <Sider width={SIDEBAR_WIDTH}>
        <Menu
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
          className={this.props.classes.menu}
          onClick={this.handleItemClick}

        >
          <Menu.ItemGroup title="Pickups">
            {Sidebar.renderGamemodeItems()}
          </Menu.ItemGroup>

          <Menu.Divider />

          {this.renderLastPickupItem()}

          <Menu.Divider />

          {this.renderUserItems()}
        </Menu>
      </Sider>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, Props> => {
  const getLastPickup = makeGetLastPickup();

  return (state) => {
    return {
      lastPickup: getLastPickup(state, getCurrentUserId(state)),
      userId: getCurrentUserId(state),
    };
  };
};
const mapDispatchToProps: MapDispatchToProps<Props> = (dispatch) => {
  return { logout: () => dispatch(logoutUser()) };
};

export { SIDEBAR_WIDTH };

export default compose(
  withRouter,
  connect(makeMapStateToProps, mapDispatchToProps),
  injectSheet(styles),
)(Sidebar);
