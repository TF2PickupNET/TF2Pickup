import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomItem from 'random-item';
import lockr from 'lockr';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Divider,
  colors,
  elevation,
  Typography,
} from 'materialize-react';
import Parallax from 'react-smart-parallax';

import regions from '@tf2-pickup/configs/regions';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import app from '../../app';
import Link from '../../components/link';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import eu from '../../../assets/images/flags/eu.jpg';
import na from '../../../assets/images/flags/na.jpg';
import oc from '../../../assets/images/flags/oc.jpg';
import servemeLogo from '../../../assets/images/about/serveme_logo.png';
import steamLoginButton from '../../../assets/images/steam_large_noborder.png';

import LandingPageHeader from './header';
import LandingPageSection from './section';
import LandingPageFooter from './footer';

const gamemodeDisplays = Object.values(gamemodes).map(gamemode => gamemode.display);
const regionDisplays = Object.values(regions).map(region => region.fullName);

/**
 * The view for the Landing Page.
 *
 * @class
 */
export class View extends PureComponent {
  static propTypes = {
    redirect: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      image: PropTypes.string.isRequired,
      divider: PropTypes.string.isRequired,
      regionContainer: PropTypes.string.isRequired,
      regionImage: PropTypes.string.isRequired,
      regionText: PropTypes.string.isRequired,
      parallax: PropTypes.string.isRequired,
      parallaxText: PropTypes.string.isRequired,
      steamButton: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = { user: null };

  static styles = {
    image: {
      borderRadius: 4,
      boxShadow: elevation(4),

      '&.serve-me': {
        width: 300,
        height: 300,
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
      boxShadow: elevation(4),
      width: '100%',
      backgroundColor: colors.grey900,
      color: colors.whiteText,
      boxSizing: 'border-box',
      textAlign: 'center',
      padding: '40px 15%',

    },

    parallax: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      height: 400,
      padding: '50px 15%',
      textAlign: 'center',

      '& .parallax--image': { filter: 'blur(8px)' },
    },

    parallaxText: {
      textShadow: `0 2px 3px ${colors.blackSecondaryText}`,
      color: colors.whiteText,
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
   * Redirect the user when the initial prop user is not null.
   *
   * @param {Object} props - The props for the component.
   */
  constructor(props) {
    super(props);

    if (this.props.user) {
      this.redirect();
    }
  }

  /**
   * Redirect the user when he logs in.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
      this.redirect();
    }
  }

  /**
   * Redirect the user to one of the pickups.
   */
  redirect = () => {
    const gamemode = lockr.get('lastGamemode') || '6v6';

    this.props.redirect(`/${gamemode}`);
  };

  randomGamemode = randomItem([sixes, hl]);
  randomRegion = randomItem([eu, na, oc]);

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Helmet><title>Welcome</title></Helmet>

        <LandingPageHeader />

        <LandingPageSection
          imgSrc="https://placehold.it/400x250"
          imagePosition="right"
          imgProps={{ className: classes.image }}
        >
          High Quality Team Fortress 2 Pickup Games <br />
          Sign up with your Steam account, join your preferred game modes, <br />
          pick your best/favorite class, we will take care of the rest!
        </LandingPageSection>

        <Divider className={classes.divider} />

        <LandingPageSection
          imgSrc={servemeLogo}
          imagePosition="left"
          imgProps={{ className: `${classes.image} serve-me` }}
        >
          Powerful American & European Team Fortress 2 servers provided by <Link href="http://serveme.tf">serveme.tf</Link>
        </LandingPageSection>

        <section className={classes.regionContainer}>
          <img
            src={this.randomRegion}
            alt="region-flag"
            className={classes.regionImage}
          />

          <Typography
            typography="display1"
            className={classes.regionText}
          >
            Currently available in the following regions: <br />
            {View.arrayToText(regionDisplays)}
          </Typography>
        </section>

        <LandingPageSection
          imgSrc="https://placehold.it/400x250"
          imagePosition="left"
          imgProps={{ className: classes.image }}
        >
          Buddy system: pick someone as your buddy
          <br /> and there is a high chance you will end up with that player on your team!
        </LandingPageSection>

        <Parallax
          img={this.randomGamemode}
          className={classes.parallax}
        >
          <Typography
            typography="display2"
            className={classes.parallaxText}
          >
            Supporting a wide variety of popular competitive formats: <br />
            {View.arrayToText(gamemodeDisplays)}
          </Typography>
        </Parallax>

        <LandingPageSection
          imgSrc={steamLoginButton}
          imagePosition="right"
          imgProps={{
            className: classes.steamButton,
            onClick: app.redirectToSteamAuth,
          }}
        >
          To start playing, simply login with your Steam account
        </LandingPageSection>

        <LandingPageFooter />
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(View.styles)(View));
