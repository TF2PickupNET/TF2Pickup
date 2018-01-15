import React from 'react';
import {
  Layout,
  Divider,
} from 'materialize-react';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import UserItem from '../../../components/user-item';

/**
 * The component to render a player in the match page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Player(props) {
  return (
    <Aux>
      <span className={props.classes.divider}>
        <Divider />
      </span>

      <Layout
        reverse={props.name === 'BLU'}
        className={props.classes.player}
      >
        <img
          src={props.player.avatar}
          className={props.classes.avatar}
          alt="avatar"
        />

        <span className={props.classes.userItemContainer}>
          <UserItem
            user={props.player}
            className={props.classes.userItem}
          />
        </span>
      </Layout>
    </Aux>
  );
}

Player.propTypes = {
  classes: PropTypes.shape({
    player: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    userItem: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

Player.styles = {
  divider: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    padding(props) {
      if (props.name === 'BLU') {
        return '0 64px 0 0';
      }

      return '0 0 0 64px';
    },
  },

  player: {
    height: 56,
    padding: '0 8px',

    '&:last-child': { marginBottom: 8 },
  },

  avatar: {
    height: 40,
    width: 40,
    padding: 8,
    borderRadius: '50%',
  },

  userItemContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userItem: { fontSize: 16 },
};

export default injectSheet(Player.styles)(Player);

