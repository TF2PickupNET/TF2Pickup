import React from 'react';
import {
  Toolbar,
  List,
  Ripple,
  Icon,
  Divider,
} from 'materialize-react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import { Logo } from '../../icons';

/**
 * A component to render the content of the sidebar.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component provided by Jss.
 * @returns {JSX} - Returns the sidebar content.
 */
export function DrawerContent({
  classes,
  user,
}) {
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} />
      </Toolbar>

      <List>
        <List.Subheader>Gamemodes</List.Subheader>

        {Object.values(gamemodes).map(gamemode => (
          <List.Item key={gamemode.name}>
            {gamemode.display}

            <Ripple />
          </List.Item>
        ))}
      </List>

      <Divider />

      <List inset>
        <List.Item leftItem={<Icon icon="history" />}>
          Recent Pickups

          <Ripple />
        </List.Item>

        <List.Item leftItem={<Icon icon="server" />}>
          Servers

          <Ripple />
        </List.Item>

        <List.Item leftItem={<Icon icon="format-list-bulleted" />}>
          Rules

          <Ripple />
        </List.Item>

        <List.Item leftItem={<Icon icon="information" />}>
          About

          <Ripple />
        </List.Item>

        <List.Item leftItem={<Icon icon="currency-usd" />}>
          Donate

          <Ripple />
        </List.Item>
      </List>

      <Divider />

      {user ? (
        <List inset>
          <List.Item leftItem={<Icon icon="gamepad" />}>
            Last Pickup

            <Ripple />
          </List.Item>

          <List.Item leftItem={<Icon icon="account-circle" />}>
            Profile

            <Ripple />
          </List.Item>

          <List.Item leftItem={<Icon icon="settings" />}>
            Settings

            <Ripple />
          </List.Item>

          <List.Item leftItem={<Icon icon="logout" />}>
            Logout

            <Ripple />
          </List.Item>
        </List>
      ) : (
        <List inset>
          <List.Item leftItem={<Icon icon="login" />}>
            Login

            <Ripple />
          </List.Item>
        </List>
      )}

      <Divider />

      <List inset>
        <List.Item leftItem={<Icon icon="message-alert" />}>
          Send feedback

          <Ripple />
        </List.Item>

        <List.Item leftItem={<Icon icon="help-circle" />}>
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
};

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
)(injectSheet(DrawerContent.styles)(DrawerContent));
