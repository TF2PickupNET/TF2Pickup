import React from 'react';
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

/**
 * A component to render the content of the sidebar.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component provided by Jss.
 * @param {Object} props.user - The currently logged in user.
 * @param {Function} props.redirect - A function which will change the url.
 * @returns {JSX} - Returns the sidebar content.
 */
export function DrawerContent({
  classes,
  user,
  redirect,
}) {
  const createRedirect = url => () => redirect(url);
  const handleLogoutClick = () => app.logout();
  const handleLoginClick = () => app.redirectToSteamAuth();
  const redirectToFeedback = () => openWindowInNewTab(discordUrls.suggestions);

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} />
      </Toolbar>

      <List>
        <List.Subheader>Gamemodes</List.Subheader>

        {Object.values(gamemodes).map(gamemode => (
          <List.Item
            key={gamemode.name}
            onClick={createRedirect(`/${gamemode.name}`)}
          >
            {gamemode.display}

            <Ripple />
          </List.Item>
        ))}
      </List>

      <Divider />

      <List inset>
        <List.Item
          leftItem={<Icon icon="history" />}
          onClick={createRedirect('/recent-pickups')}
        >
          Recent Pickups

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="server" />}
          onClick={createRedirect('/servers')}
        >
          Servers

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="format-list-bulleted" />}
          onClick={createRedirect('/rules')}
        >
          Rules

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="information" />}
          onClick={createRedirect('/about')}
        >
          About

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="currency-usd" />}
          onClick={createRedirect('/donate')}
        >
          Donate

          <Ripple />
        </List.Item>
      </List>

      <Divider />

      {user ? (
        <List inset>
          <List.Item
            leftItem={<Icon icon="gamepad" />}
            onClick={createRedirect('/last-pickup')}
          >
            Last Pickup

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="account-circle" />}
            onClick={createRedirect('/profile')}
          >
            Profile

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="settings" />}
            onClick={createRedirect('/settings')}
          >
            Settings

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="logout" />}
            onClick={handleLogoutClick}
          >
            Logout

            <Ripple />
          </List.Item>
        </List>
      ) : (
        <List inset>
          <List.Item
            leftItem={<Icon icon="login" />}
            onClick={handleLoginClick}
          >
            Login

            <Ripple />
          </List.Item>
        </List>
      )}

      <Divider />

      <List inset>
        <List.Item
          leftItem={<Icon icon="message-alert" />}
          onClick={redirectToFeedback}
        >
          Send feedback

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="help-circle" />}
          onClick={createRedirect('/help')}
        >
          Help

          <Ripple />
        </List.Item>
      </List>
    </div>
  );
}

DrawerContent.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({}),
  redirect: PropTypes.func.isRequired,
};

DrawerContent.defaultProps = { user: null };

DrawerContent.styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: { height: 48 },
};

export default connect(
  (state) => {
    return { user: state.user };
  },
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(DrawerContent.styles)(DrawerContent));
