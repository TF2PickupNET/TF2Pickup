import React, { PureComponent } from 'react';
import Aux from 'react-aux';
import {
  Toolbar,
  List,
  Ripple,
  Icon,
  Divider,
} from 'materialize-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import app from '../../app';
import { Logo } from '../../icons';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';
import { discordUrls } from '../../../config/client';

import ListItem from './drawer-list-item';

/**
 * The content for the drawer.
 *
 * @class
 */
class DrawerContent extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      toolbar: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }).isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

  static styles = {
    toolbar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    logo: { height: 48 },
  };

  handleLogoutClick = () => app.logout();

  handleLoginClick = () => app.redirectToSteamAuth();

  handleSuggestionsClick = () => openWindowInNewTab(discordUrls.suggestions);

  /**
   * Render the users part in the drawer.
   *
   * @returns {JSX} - Returns the JSX to render.
   */
  renderUserList() {
    if (this.props.userId) {
      return (
        <Aux>
          <ListItem
            inset
            leftItem={<Icon icon="gamepad" />}
            redirectTo="/last-pickup"
          >
            Last Pickup
          </ListItem>

          <ListItem
            inset
            leftItem={<Icon icon="account-circle" />}
            redirectTo={`/profile/${this.props.userId}`}
          >
            Profile
          </ListItem>

          <ListItem
            inset
            leftItem={<Icon icon="settings" />}
            redirectTo="/settings"
          >
            Settings
          </ListItem>

          <ListItem
            inset
            leftItem={<Icon icon="logout" />}
            onClick={this.handleLogoutClick}
          >
            Logout
          </ListItem>
        </Aux>
      );
    }

    return (
      <ListItem
        inset
        leftItem={<Icon icon="login" />}
        onClick={this.handleLoginClick}
      >
        Login
      </ListItem>
    );
  }

  render() {
    return (
      <Aux>
        <Toolbar className={this.props.classes.toolbar}>
          <Logo className={this.props.classes.logo} />
        </Toolbar>

        <List>
          <List.Subheader>
            Gamemodes
          </List.Subheader>

          {Object.values(gamemodes).map(gamemode => (
            <ListItem
              key={gamemode.name}
              redirectTo={`/${gamemode.name}`}
            >
              {gamemode.display}
            </ListItem>
          ))}
        </List>

        <Divider />

        <List inset>
          <ListItem
            leftItem={<Icon icon="history" />}
            redirectTo="/recent-pickups"
          >
            Recent Pickups
          </ListItem>

          <ListItem
            leftItem={<Icon icon="server" />}
            redirectTo="/servers"
          >
            Servers
          </ListItem>

          <ListItem
            leftItem={<Icon icon="format-list-bulleted" />}
            redirectTo="/rules"
          >
            Rules
          </ListItem>

          <ListItem
            leftItem={<Icon icon="information" />}
            redirectTo="/about"
          >
            About
          </ListItem>

          <ListItem
            leftItem={<Icon icon="currency-usd" />}
            redirectTo="/donate"
          >
            Donate
          </ListItem>
        </List>

        <Divider />

        <List inset>
          {this.renderUserList()}
        </List>

        <Divider />

        <List inset>
          <ListItem
            leftItem={<Icon icon="message-alert" />}
            onClick={this.handleSuggestionsClick}
          >
            Send feedback

            <Ripple />
          </ListItem>

          <ListItem
            leftItem={<Icon icon="help-circle" />}
            redirectTo="/help"
          >
            Help
          </ListItem>
        </List>
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    return { userId: state.user ? state.user.id : null };
  },
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(DrawerContent.styles)(DrawerContent));
