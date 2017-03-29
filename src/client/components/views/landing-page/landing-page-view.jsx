import React, {
  PureComponent,
  PropTypes,
} from 'react';
import Chance from 'chance';
import lockr from 'lockr';
import Helmet from 'react-helmet';
import regions from '@tf2-pickup/configs/regions';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import {
  Stylesheet,
  Parallax,
  Divider,
  colors,
} from 'tf2pickup-components';

import { storageKeys, cdnUrl } from '/src/client/config';
import { arrayToText } from '/src/utils/string';
import app from '/src/client/app';
import LandingPageHeader from './landing-page-header';
import LandingPageSection from './landing-page-section';
import LandingPageFooter from './landing-page-footer';

const gamemodeDisplays = Object.values(gamemodes).map(gamemode => gamemode.display);
const regionDisplays = Object.values(regions).map(region => region.fullName);
const chance = new Chance();
const styles = Stylesheet.compile({
  image: {
    borderRadius: 3,
    shadow: 4,
  },

  divider: {
    width: '70%',
    margin: '0 15%',
  },

  regions: {
    container: { layout: { direction: 'vertical' } },

    image: { size: ['100%', 'auto'] },

    text: {
      elevation: 4,
      typo: 'headline',
      width: '100%',
      backgroundColor: colors.grey900,
      color: colors.grey200,
      boxSizing: 'border-box',
      textAlign: 'center',
      padding: '40px 15%',
    },
  },

  parallax: {
    typo: 'display2',
    layout: {
      direction: 'horizontal',
      crossAlign: 'center',
      mainAlign: 'center',
    },
    color: colors.grey200,
    boxSizing: 'border-box',
    height: 400,
    padding: '50px 15%',
  },

  steamButton: {
    cursor: 'pointer',
    elevation: 0,
  },
});

class LandingPageView extends PureComponent {
  static propTypes = { redirect: PropTypes.func.isRequired };

  componentWillMount() {
    app.on('authenticated', this.onLogin);
  }

  componentWillUnmount() {
    app.removeListener('authenticated', this.onLogin);
  }

  randomGamemode = chance.pickone(['6v6', '9v9']);
  randomRegion = chance.pickone(Object.keys(regions));

  onLogin = () => {
    console.log('login');
    const gamemode = lockr.get(storageKeys.lastGamemode) || '6v6';

    this.props.redirect(`/${gamemode}`);
  };

  render() {
    return (
      <div style={styles.root}>
        <Helmet title="Welcome" />

        <LandingPageHeader />

        <LandingPageSection
          imgProps={{
            src: 'http://placehold.it/400x250',
            style: styles.image,
          }}
          imagePosition="left"
        >
          High Quality Pugs without worrying about anything.
          <br />
          Simply join and we will take care of everything, <br />
          from servers to setting the right config etc.
        </LandingPageSection>

        <Divider style={styles.divider} />

        <LandingPageSection
          imgProps={{
            src: 'http://placehold.it/400x250',
            style: styles.image,
          }}
          imagePosition="right"
        >
          High Quality Pugs without worrying about anything.
          <br />
          Simply join and we will take care of everything, <br />
          from servers to setting the right config etc.
        </LandingPageSection>

        <section style={styles.regions.container}>
          <img
            src={`${cdnUrl}/images/flags/${this.randomRegion}.jpg`}
            alt="region-flag"
            style={styles.regions.image}
          />

          <div style={styles.regions.text}>
            We currently support {arrayToText(regionDisplays)}
          </div>
        </section>

        <LandingPageSection
          imgProps={{
            src: 'http://placehold.it/400x250',
            style: styles.image,
          }}
          imagePosition="left"
        >
          We currently feature In-Game commands, <br />
          support for reporting people for different reasons
        </LandingPageSection>

        <Parallax
          img={`${cdnUrl}/images/background/${this.randomGamemode}.jpg`}
          style={styles.parallax}
          imgStyle={{ filter: 'blur(3px)' }}
        >
          We currently support {arrayToText(gamemodeDisplays)}
        </Parallax>

        <LandingPageSection
          imgProps={{
            src: `${cdnUrl}/images/steam_large_noborder.png`,
            style: styles.steamButton,
            onClick: LandingPageView.redirectToLogin,
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

export default LandingPageView;
