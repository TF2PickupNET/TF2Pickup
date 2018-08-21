// @flow

import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Menu,
  Layout,
  Avatar,
} from 'antd';

import { type Store } from '../../store';
import { isString } from '../../../utils';

import { SIDEBAR_WIDTH } from './Sidebar';

type Props = {
  classes: {
    header: string,
    menu: string,
    menuItem: string,
    logo: string,
    avatar: string,
  },
  name: string,
  avatar: string,
};
type State = { title: string | null };

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

class Toolbar extends React.PureComponent<Props, State> {
  state = { title: null };

  handleStateChange = (state: { title?: string }) => {
    if (isString(state.title)) {
      this.setState({ title: state.title });
    }
  };

  renderRightMenu() {
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

export default connect((state: Store) => {
  return {
    name: state.user.name,
    avatar: state.profile.steam.avatar.large,
  };
})(injectSheet(styles)(Toolbar));
