import React, { PureComponent } from 'react';
import {
  Icon,
  Divider,
  colors,
  typography,
} from 'materialize-react';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import injectSheet from 'react-jss';

import socialMedia from '@tf2-pickup/configs/social-media';

import Link from '../../components/link';

/**
 * This component renders the footer of the LandingPage.
 *
 * @class
 */
class Footer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      footer: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      socialMediaHeader: PropTypes.string.isRequired,
      socialMediaLink: PropTypes.string.isRequired,
      divider: PropTypes.string.isRequired,
      pageLink: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    footer: {
      padding: '30px 15%',
      backgroundColor: colors.grey900,
      color: colors.grey300,
    },

    container: {
      display: 'flex',
      justifyContent: 'center',
    },

    socialMediaHeader: {
      ...typography.display2,
      textAlign: 'center',
      margin: '0 0 30px',
    },

    socialMediaLink: {
      padding: '0 20px',
      color: 'inherit',
    },

    divider: {
      width: '70%',
      margin: '30px 15%',
      backgroundColor: colors.whiteDivider,
    },

    pageLink: {
      ...typography.display1,
      padding: '15px 30px',
      color: 'inherit',
      textDecoration: 'none',
    },
  };

  static pages = [
    'rules',
    'about',
    'help',
  ];

  static socialMediaValues = Object.values(socialMedia);

  /**
   * Render the links and icons to the social media accounts.
   *
   * @param {Object} classes - The classes object from Jss.
   * @returns {JSX[]} - Returns the JSX.
   */
  static renderSocialMediaLinks(classes) {
    return Footer.socialMediaValues.map(data => (
      <Link
        key={data.name}
        href={data.url}
        className={classes.socialMediaLink}
      >
        <Icon
          icon={data.icon}
          className={'mdi-48px'}
          style={{ color: 'inherit' }}
        />
      </Link>
    ));
  }

  /**
   * Render the links for different internal page links like help and about.
   *
   * @param {Object} classes - The classes object from Jss.
   * @returns {JSX[]} - Returns the JSX.
   */
  static renderPageLinks(classes) {
    return Footer.pages.map(page => (
      <Link
        href={`/${page}`}
        key={page}
        className={classes.pageLink}
      >
        {capitalize(page)}
      </Link>
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <div className={classes.socialMediaHeader}>
          You can also find TF2Pickup.net here
        </div>

        <div className={classes.container}>
          {Footer.renderSocialMediaLinks(classes)}
        </div>

        <Divider className={classes.divider} />

        <div className={classes.container}>
          {Footer.renderPageLinks(classes)}
        </div>
      </footer>
    );
  }
}

export default injectSheet(Footer.styles)(Footer);
