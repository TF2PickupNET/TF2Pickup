import React from 'react';
import Chance from 'chance';
import injectSheet from 'react-jss';
import {
  timings,
  colors,
  elevation,
  typography,
} from 'materialize-react';

import { Logo } from '../../icons';
import { imageUrl } from '../../config';

const gamemode = new Chance().pickone(['bball', 'ultiduo']);
const align = {
  bball: 'flex-end',
  ultiduo: 'flex-start',
};

function LandingPageHeader({ classes }) {
  return (
    <header className={classes.header}>
      <span className={classes.title}>
        Welcome to
      </span>

      <Logo
        circleColor={colors.grey200}
        pickupColor={colors.grey500}
        className={classes.logo}
      />
    </header>
  );
}

LandingPageHeader.styles = {
  '@keyframes header--fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  header: {
    animation: `header--fade-in 500ms ${timings.easeInOutQuad}`,
    animationFillMode: 'forwards',
    display: 'flex',
    alignItems: 'center',
    justifyContent: align[gamemode],
    boxShadow: elevation(4),
    width: '100%',
    height: '75vh',
    backgroundImage: `url(${imageUrl}/background/${gamemode}.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    padding: '10% 20%',
    boxSizing: 'border-box',
    opacity: 0,
  },

  title: {
    ...typography.display3,
    padding: 10,
    color: colors.grey200,
    fontSize: 80,
  },

  logo: { height: 160 },
};

export default injectSheet(LandingPageHeader.styles)(LandingPageHeader);
