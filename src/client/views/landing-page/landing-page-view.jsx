import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';
import lockr from 'lockr';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import regions from '@tf2-pickup/configs/regions';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import {
  Parallax,
  Divider,
  colors,
  elevation,
  typography,
} from 'materialize-react';

import {
  storageKeys,
  imageUrl,
} from '../../config';
import { arrayToText } from '../../../utils/string';
import app from '../../app';
import LandingPageHeader from './landing-page-header';
import LandingPageSection from './landing-page-section';
import LandingPageFooter from './landing-page-footer';

const gamemodeDisplays = Object.values(gamemodes).map(gamemode => gamemode.display);
const regionDisplays = Object.values(regions).map(region => region.fullName);
const chance = new Chance();

export class LandingPageView extends PureComponent {
  static propTypes = { redirect: PropTypes.func.isRequired };

  static styles = {
    image: {
      borderRadius: 3,
      boxShadow: elevation(4),
    },

    divider: {
      width: '70%',
      margin: '0 15%',
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

  componentWillMount() {
    app.on('authenticated', this.onLogin);
  }

  componentWillUnmount() {
    app.removeListener('authenticated', this.onLogin);
  }

  randomGamemode = chance.pickone(['6v6', '9v9']);
  randomRegion = chance.pickone(Object.keys(regions));

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
          imgProps={{
            src: `${imageUrl}/about/serveme_logo.png`,
            className: classes.image,
            style: {
              borderRadius: '50%',
              height: 300,
              width: 300,
            },
          }}
          imagePosition="left"
        >
          Servers are graciously provided by serveme.tf
          <br />
          This means no bad servers <br />
          like in the old days of TF2Pickup.
        </LandingPageSection>

        <Divider className={classes.divider} />

        <LandingPageSection
          imgProps={{
            src: 'http://placehold.it/400x250',
            className: classes.image,
          }}
          imagePosition="right"
        >
          High Quality Pugs without worrying about anything.
          <br />
          Simply join and we will take care of everything, <br />
          from servers to setting the right config etc.
        </LandingPageSection>

        <section className={classes.regionContainer}>
          <img
            src={`${imageUrl}/flags/${this.randomRegion}.jpg`}
            alt="region-flag"
            className={classes.regionImage}
          />

          <div className={classes.regionText}>
            We currently support {arrayToText(regionDisplays)}
          </div>
        </section>

        <LandingPageSection
          imgProps={{
            src: 'http://placehold.it/400x250',
            className: classes.image,
          }}
          imagePosition="left"
        >
          We currently feature In-Game commands, <br />
          support for reporting people for different reasons
        </LandingPageSection>

        <Parallax
          img={`${imageUrl}/background/${this.randomGamemode}.jpg`}
          className={classes.parallax}
        >
          We currently support {arrayToText(gamemodeDisplays)}
        </Parallax>

        <LandingPageSection
          imgProps={{
            src: `${imageUrl}/steam_large_noborder.png`,
            className: classes.steamButton,
          }}
          imagePosition="right"
        >
          To start playing, simply login with your Steam account
        </LandingPageSection>

        <LandingPageFooter />
      </div>
    );
  }
}

export default injectSheet(LandingPageView.styles)(LandingPageView);
