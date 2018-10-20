// @flow

import React from 'react';
import {
  connect, type MapStateToProps,
} from 'react-redux';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import {
  Menu,
  Layout,
  Avatar,
} from 'antd';

import { type State } from '../../store';
import { isString } from '../../../utils';
import { makeGetUserName } from '../../store/users/selectors';
import { makeGetProfileById } from '../../store/user-profiles/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';

import { SIDEBAR_WIDTH } from './Sidebar';

type ConnectedProps = {|
  name: string | null,
  avatar: string | null,
|};
type OwnProps = {
  classes: {
    header: string,
    menu: string,
    menuItem: string,
    logo: string,
    avatar: string,
  },
};
type LocalState = { title: string | null };

const { Header } = Layout;

const styles = {
  header: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },

  menu: {
    padding: 0,
    lineHeight: '64px',
    height: 64,
    display: 'inline',
  },

  menuItem: {
    padding: '0 32px',
    fontSize: '1.5em',
  },

  logo: {
    composes: '$menuItem',
    width: SIDEBAR_WIDTH,
    textAlign: 'center',
    fontSize: '1.8em',
  },

  avatar: { marginLeft: 16 },
};

class Toolbar extends React.PureComponent<OwnProps & ConnectedProps, LocalState> {
  state = { title: null };

  handleStateChange = (state?: { title?: string }) => {
    if (state && isString(state.title)) {
      const match = state.title.match(/^(.+) \| TF2Pickup$/);

      if (match && match.length >= 2) {
        const pageName = match[1];

        this.setState({ title: pageName });
      }
    }
  };

  renderRightMenu() {
    if (this.props.name === null || this.props.avatar === null) {
      return null;
    }

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        className={this.props.classes.menu}
      >
        <Menu.Item className={this.props.classes.menuItem}>
          <Link to="/profile">
            {this.props.name}

            <Avatar
              size="large"
              src={this.props.avatar}
              className={this.props.classes.avatar}
            />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Header className={this.props.classes.header}>
        <Helmet onChangeClientState={this.handleStateChange} />

        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          className={this.props.classes.menu}
        >
          <Menu.Item className={this.props.classes.logo}>
            TF2Pickup
          </Menu.Item>

          <Menu.Item className={this.props.classes.menuItem}>
            {this.state.title}
          </Menu.Item>
        </Menu>

        {this.renderRightMenu()}
      </Header>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getName = makeGetUserName();
  const getAvatar = createSelector(
    makeGetProfileById(),
    profile => (profile === null ? null : profile.steam.avatar.large),
  );

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      name: getName(state, userId),
      avatar: getAvatar(state, userId),
    };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(Toolbar)
);
