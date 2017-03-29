import React from 'react';
import {
  Toolbar,
  Stylesheet,
} from 'tf2pickup-components';
import lockr from 'lockr';

import { storageKeys } from '/src/client/config';
import Logo from '/src/client/components/icons/logo';
import Link from '/src/client/components/link';

const styles = Stylesheet.compile({
  toolbar: {
    height: 80,
    layout: {
      direction: 'horizontal',
      mainAlign: 'center',
    },
  },

  logoButton: {
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
  },

  logo: { height: 48 },
});

export default function DrawerToolbar() {
  const gamemode = lockr.get(storageKeys.lastGamemode) || '6v6';

  return (
    <Toolbar style={styles.toolbar}>
      <Link to={`/${gamemode}`}>
        <Logo style={styles.logo} />
      </Link>
    </Toolbar>
  );
}
