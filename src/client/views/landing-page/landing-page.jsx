import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';
import lockr from 'lockr';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import regions from '@tf2-pickup/configs/regions';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import {
  Divider,
  colors,
  elevation,
  typography,
} from 'materialize-react';
import Parallax from 'react-smart-parallax';

import {
  storageKeys,
  imageUrl,
} from '../../config';
import { authUrl } from '../../../config';
import app from '../../app';
import LandingPageHeader from './landing-page-header';
import LandingPageSection from './landing-page-section';
import LandingPageFooter from './landing-page-footer';
import Link from '../../components/link';

const gamemodeDisplays = Object.values(gamemodes).map(gamemode => gamemode.display);
const regionDisplays = Object.values(regions).map(region => region.fullName);
const chance = new Chance();

/**
 * Main component for the Landing Page.
 *
 * @class
 */
export class LandingPage extends PureComponent {
  static propTypes = {
    redirect: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      image: PropTypes.string.isRequired,
      divider: PropTypes.string.isRequired,
      regionContainer: PropTypes.string.isRequired,
      regionImage: PropTypes.string.isRequired,
      regionText: PropTypes.string.isRequired,
      parallax: PropTypes.string.isRequired,
      steamButton: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    image: {
      borderRadius: 3,
      boxShadow: elevation(4),

      '&.serve-me': {
        width: 300,
        height: 300,
        borderRadius: '50%',
      },
    },

    divider: {
      width: '80%',
      margin: '0 10%',
    },

    regionContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    regionImage: {
      width: '100%',
      height: 'auto',
    },

    regionText: {
      ...typography.display2,
      boxShadow: elevation(4),
      width: '100%',
      backgroundColor: colors.grey900,
      color: colors.grey200,
      boxSizing: 'border-box',
      textAlign: 'center',
      padding: '40px 15%',

    },

    parallax: {
      ...typography.display2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.grey200,
      boxSizing: 'border-box',
      height: 400,
      padding: '50px 15%',

      '& .parallax--image': { filter: 'blur(5px)' },
    },

    steamButton: {
      cursor: 'pointer',
      transform: 'scale(1.5)',
      margin: '0 25px',
    },
  };

  /**
   * Transform an array of strings into a comma and 'and' separated list.
   *
   * @param {String[]} array - The array of strings.
   * @returns {String} - Returns the concatenated string.
   */
  static arrayToText(array) {
    return array.reduce((str, currentValue, currentIndex) => {
      const isLastItem = array.length - 1 === currentIndex;

      return `${str}${isLastItem ? ' and' : ','} ${currentValue}`;
    }).trim();
  }

  /**
   * Add a event listener to when the user logs in.
   */
  componentWillMount() {
    app.on('authenticated', this.onLogin);
  }

  /**
   * Remove the event listener again when the component unmounts.
   */
  componentWillUnmount() {
    app.removeListener('authenticated', this.onLogin);
  }

  randomGamemode = chance.pickone(['6v6', '9v9']);
  randomRegion = chance.pickone(Object.keys(regions));

  /**
   * Redirect the user to the steam login page.
   */
  redirectToSteamAuth = () => {
    window.location = authUrl;
  };

  /**
   * Redirect the user to the last gamemode when the user get's logged in automatically.
   */
  onLogin = () => {
    const gamemode = lockr.get(storageKeys.lastGamemode) || '6v6';

    this.props.redirect(`/${gamemode}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Helmet title="Welcome" />

        <LandingPageHeader />

        <LandingPageSection
          imgSrc="http://placehold.it/400x250"
          imagePosition="right"
          imgProps={{ className: classes.image }}
        >
          High Quality Pugs without worrying about anything.
          <br />
          Simply join and we will take care of everything, <br />
          from servers to setting the right config.
        </LandingPageSection>

        <Divider className={classes.divider} />

        <LandingPageSection
          imgSrc={`${imageUrl}/about/serveme_logo.png`}
          imagePosition="left"
          imgProps={{ className: `${classes.image} serve-me` }}
        >
          Servers are graciously provided by <Link href="http://serveme.tf">serveme.tf</Link>
          <br />
          This means no bad servers <br />
          like in the old days of TF2Pickup.
        </LandingPageSection>

        <section className={classes.regionContainer}>
          <img
            src={`${imageUrl}/flags/${this.randomRegion}.jpg`}
            alt="region-flag"
            className={classes.regionImage}
          />

          <div className={classes.regionText}>
            We currently support {LandingPage.arrayToText(regionDisplays)}
          </div>
        </section>

        <LandingPageSection
          imgSrc="http://placehold.it/400x250"
          imagePosition="left"
          imgProps={{ className: classes.image }}
        >
          As a medic you can pick one of the players as your buddy,
          <br /> which automatically puts him on your team.
        </LandingPageSection>

        <Parallax
          img={`${imageUrl}/background/${this.randomGamemode}.jpg`}
          className={classes.parallax}
        >
          We currently support {LandingPage.arrayToText(gamemodeDisplays)}
        </Parallax>

        <LandingPageSection
          imgSrc={`${imageUrl}/steam_large_noborder.png`}
          imagePosition="right"
          imgProps={{
            className: classes.steamButton,
            onClick: this.redirectToSteamAuth,
          }}
        >
          To start playing, simply login with your Steam account
        </LandingPageSection>

        <LandingPageFooter />
      </div>
    );
  }
}

export default injectSheet(LandingPage.styles)(LandingPage);
