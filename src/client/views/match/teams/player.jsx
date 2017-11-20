import React from 'react';
import {
  Layout,
  Divider,
} from 'materialize-react';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import UserItem from '../../../components/user-item';
import Link from '../../../components/link';

/**
 * The component to render a player in the match page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Player(props) {
  return (
    <Aux>
      <Divider />

      <Layout
        reverse={props.name === 'BLU'}
        className={props.classes.player}
      >
        <img
          src={props.player.avatar}
          className={props.classes.avatar}
          alt="avatar"
        />

        <Link
          href={`/profile/${props.player.id}`}
          className={props.classes.link}
        >
          <UserItem
            user={props.player}
            className={props.classes.userItem}
          />
        </Link>
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
  player: {
    height: 56,
    padding: '0 8px',
  },

  avatar: {
    height: 40,
    width: 40,
    padding: 8,
    borderRadius: '50%',
  },

  link: {
    flex: 1,
    padding: 8,
  },

  userItem: {
    lineHeight: '40px',
    fontSize: 18,
    height: 40,
  },
};

export default injectSheet(Player.styles)(Player);

