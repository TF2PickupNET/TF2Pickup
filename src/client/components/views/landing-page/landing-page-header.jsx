import React, { PureComponent } from 'react';
import Chance from 'chance';
import {
  timings,
  Stylesheet,
  colors,
} from 'tf2pickup-components/lib/index';

import { Logo } from '/src/client/components/icons';
import { cdnUrl } from '/src/client/config';

export default class LandingPageHeader extends PureComponent {
  componentDidMount() {
    this.header.animate({ opacity: [0, 1] }, {
      fill: 'forwards',
      easing: timings.easeInOutCubic,
      duration: 500,
    });
  }

  gamemode = new Chance().pickone(['bball', 'ultiduo']);

  get styles() {
    const url = `url(${cdnUrl}/images/background/${this.gamemode}.jpg)`;
    const align = {
      bball: 'flex-end',
      ultiduo: 'flex-start',
    };

    return Stylesheet.compile({
      header: {
        layout: {
          direction: 'horizontal',
          crossAlign: 'center',
          mainAlign: align[this.gamemode],
        },
        elevation: 4,
        size: ['100%', '75vh'],
        backgroundImage: url,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        padding: '15% 20%',
        boxSizing: 'border-box',
        opacity: 0,
      },

      title: {
        typo: 'display3',
        padding: 10,
        color: colors.grey200,
      },

      logo: { height: 150 },
    });
  }

  render() {
    const styles = this.styles;

    return (
      <header
        style={styles.header}
        ref={(element) => { this.header = element; }}
      >
        <span style={styles.title}>
          Welcome to
        </span>

        <Logo
          circleColor={colors.grey200}
          pickupColor={colors.grey500}
          style={styles.logo}
        />
      </header>
    );
  }
}
