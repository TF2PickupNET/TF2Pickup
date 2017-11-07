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
 * @param {Function} props.closeDrawer - A function which will close the drawer.
 * This is used for closing the drawer when the user clicks on a list item.
 * @returns {JSX} - Returns the sidebar content.
 */
function DrawerContent(props) {
  const {
    redirect,
    closeDrawer,
  } = props;
  const createRedirect = url => () => redirect(url);
  const handleLogoutClick = () => app.logout();
  const handleLoginClick = () => app.redirectToSteamAuth();
  const createNewTab = url => () => openWindowInNewTab(url);
  /**
   * Create a callback which will call a passed in function and the closeDrawer prop function.
   *
   * @param {Function} func - An additional function to call.
   * @returns {Function} - Returns the callback for the event.
   */
  const handleItemPress = func => () => {
    func();

    closeDrawer();
  };

  return (
    <div>
      <Toolbar className={props.classes.toolbar}>
        <Logo className={props.classes.logo} />
      </Toolbar>

      <List>
        <List.Subheader>Gamemodes</List.Subheader>

        {Object.values(gamemodes).map(gamemode => (
          <List.Item
            key={gamemode.name}
            onClick={handleItemPress(createRedirect(`/${gamemode.name}`))}
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
          onClick={handleItemPress(createRedirect('/recent-pickups'))}
        >
          Recent Pickups

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="server" />}
          onClick={handleItemPress(createRedirect('/servers'))}
        >
          Servers

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="format-list-bulleted" />}
          onClick={handleItemPress(createRedirect('/rules'))}
        >
          Rules

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="information" />}
          onClick={handleItemPress(createRedirect('/about'))}
        >
          About

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="currency-usd" />}
          onClick={handleItemPress(createRedirect('/donate'))}
        >
          Donate

          <Ripple />
        </List.Item>
      </List>

      <Divider />

      {props.user ? (
        <List inset>
          <List.Item
            leftItem={<Icon icon="gamepad" />}
            onClick={handleItemPress(createRedirect('/last-pickup'))}
          >
            Last Pickup

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="account-circle" />}
            onClick={handleItemPress(createRedirect('/profile'))}
          >
            Profile

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="settings" />}
            onClick={handleItemPress(createRedirect('/settings'))}
          >
            Settings

            <Ripple />
          </List.Item>

          <List.Item
            leftItem={<Icon icon="logout" />}
            onClick={handleItemPress(handleLogoutClick)}
          >
            Logout

            <Ripple />
          </List.Item>
        </List>
      ) : (
        <List inset>
          <List.Item
            leftItem={<Icon icon="login" />}
            onClick={handleItemPress(handleLoginClick)}
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
          onClick={handleItemPress(createNewTab(discordUrls.suggestions))}
        >
          Send feedback

          <Ripple />
        </List.Item>

        <List.Item
          leftItem={<Icon icon="help-circle" />}
          onClick={handleItemPress(createRedirect('/help'))}
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
  closeDrawer: PropTypes.func.isRequired,
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
