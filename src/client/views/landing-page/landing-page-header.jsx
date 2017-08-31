import React from 'react';
import randomItem from 'random-item';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  colors,
  elevation,
  typography,
  breakpoints,
} from 'materialize-react';

import { Logo } from '../../icons';
import { imageUrl } from '../../../config/client';

const gamemode = randomItem(['bball', 'ultiduo']);

/**
 * The header for the Landing page.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss for the header.
 * @returns {JSX} - Returns the headers JSX.
 */
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

LandingPageHeader.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

LandingPageHeader.styles = {
  header: {
    composes: gamemode,
    animationDelay: '250ms',
    animation: 'fade-in-image 750ms',
    animationFillMode: 'forwards',
    display: 'flex',
    boxShadow: elevation(4),
    width: '100%',
    height: '75vh',
    backgroundImage: `url(${imageUrl}/background/${gamemode}.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    padding: '10% 5%',
    boxSizing: 'border-box',
    opacity: 0,
    flexDirection: 'column',

    '&.bball': {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

    '&.ultiduo': {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },

    [breakpoints.only('tablet')]: { padding: '10% 15%' },

    [breakpoints.only('desktop')]: {
      padding: '10% 15%',
      flexDirection: 'row',

      '&.bball': {
        alignItems: 'center',
        justifyContent: 'flex-end',
      },

      '&.ultiduo': {
        alignItems: 'center',
        justifyContent: 'flex-start',
      },

      '& svg': { margin: 0 },
    },
  },

  title: {
    ...typography.display3,
    color: colors.grey200,
    fontSize: 80,
    lineHeight: '160px',
    padding: '0 15px',
  },

  logo: {
    height: 160,
    margin: '0 75px',
  },
};

export default injectSheet(LandingPageHeader.styles)(LandingPageHeader);
