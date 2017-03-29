import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Toolbar,
  Stylesheet,
} from 'tf2pickup-components';

import app from '/src/client/app';
import Link from '/src/client/components/link';

const styles = Stylesheet.compile({
  toolbar: {
    height: 80,
    layout: {
      direction: 'horizontal',
      mainAlign: 'space-between',
    },
  },

  loginButton: {
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
  },

  steamLogin: { height: 48 },

  avatar: {
    borderRadius: '50%',
    size: [48],
  },

  container: {
    height: 48,
    lineHeight: 1,
    layout: {
      direction: 'horizontal',
      crossAlign: 'center',
    },
  },

  username: { padding: '8px' },
});

function MainToolbar({ user }) {
  const content = user ? (
    <span style={styles.container}>
      <span style={styles.username}>{user.services.etf2l.username}</span>
      <img
        alt="avatar"
        src={user.services.steam.avatar.large}
        style={styles.avatar}
      />
    </span>
  ) : (
    <Link href="/auth/steam">
      <img
        alt="steam login"
        src="/assets/images/steam_large_noborder.png"
        style={styles.steamLogin}
      />
    </Link>
  );

  return (
    <Toolbar style={styles.toolbar}>
      <div />

      {content}
    </Toolbar>
  );
}

MainToolbar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

function mapStateToProps(state) {
  return { user: state.user === null ? false : state.user };
}

export default connect(mapStateToProps)(MainToolbar);
