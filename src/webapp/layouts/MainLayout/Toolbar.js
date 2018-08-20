// @flow

import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Menu,
  Layout,
  Avatar,
} from 'antd';

import { type Store } from '../../store';

import { SIDEBAR_WIDTH } from './Sidebar';

const { Header } = Layout;

const styles = {
  header: { padding: 0 },

  menu: {
    lineHeight: '64px',
    padding: 0,
  },

  menuItem: {
    padding: '0 16px',
    fontSize: '1.5em',
  },

  logo: {
    width: SIDEBAR_WIDTH,
    textAlign: 'center',
    fontSize: '1.8em',
  },

  avatar: { marginLeft: 16 },
};

class Toolbar extends React.PureComponent<{}> {
  renderRightMenu() {
    return (
      <Menu.Item className={this.props.classes.menuItem}>
        {this.props.name}

        <Avatar
          size="large"
          src={this.props.avatar}
          className={this.props.classes.avatar}
        />
      </Menu.Item>
    );
  }

  render() {
    return (
      <Header className={this.props.classes.header}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          className={this.props.classes.menu}
        >
          <Menu.Item className={`${this.props.classes.menuItem} ${this.props.classes.logo}`}>
            TF2Pickup
          </Menu.Item>

          <Menu.Item className={this.props.classes.menuItem}>
            6v6
          </Menu.Item>

          {this.renderRightMenu()}
        </Menu>
      </Header>
    );
  }
}

export default connect((state: Store) => {
  return {
    name: state.user.name,
    avatar: state.profile.steam.avatar.large,
  };
})(injectSheet(styles)(Toolbar));
