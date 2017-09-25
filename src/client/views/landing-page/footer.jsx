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
   * @returns {JSX[]} - Returns the JSX.
   */
  static renderSocialMediaLinks() {
    return Footer.socialMediaValues.map(data => (
      <Link
        key={data.name}
        href={data.url}
        className={this.props.classes.socialMediaLink}
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
   * @returns {JSX[]} - Returns the JSX.
   */
  static renderPageLinks() {
    return Footer.pages.map(page => (
      <Link
        href={`/${page}`}
        key={page}
        className={this.props.classes.pageLink}
      >
        {capitalize(page)}
      </Link>
    ));
  }

  render() {
    return (
      <footer className={this.props.classes.footer}>
        <div className={this.props.classes.socialMediaHeader}>
          You can also find TF2Pickup.net here
        </div>

        <div className={this.props.classes.container}>
          {Footer.renderSocialMediaLinks()}
        </div>

        <Divider className={this.props.classes.divider} />

        <div className={this.props.classes.container}>
          {Footer.renderPageLinks()}
        </div>
      </footer>
    );
  }
}

export default injectSheet(Footer.styles)(Footer);
