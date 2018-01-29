/* eslint-disable import/no-commonjs, global-require */

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Typography } from 'materialize-react';

import Link from '../../components/link';

const partners = [{
  title: 'Serveme.tf',
  link: 'https://serveme.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Easiest way to borrow a server',
}, {
  title: 'Whitelist.tf',
  link: 'https://whitelist.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Up to date (league) whitelists for gameservers',
}, {
  title: 'Logs.tf',
  link: 'https://logs.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Team Fortress 2 log parser and stats generator',
}, {
  title: 'KritzKast',
  link: 'https://kritzkast.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Up to date (league) whitelists for gameservers',
}, {
  title: 'Comp.tf',
  link: 'https://comp.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Competitive Team Fortress 2 Wiki',
}, {
  title: 'Demos.tf',
  link: 'https://demos.tf',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Team Fortress 2 demo uploader',
}, {
  title: 'teamfortress.tv',
  link: 'https://teamfortress.tv',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'Competitive Team Fortress 2 Media',
}, {
  title: 'ETF2L',
  link: 'https://etf2l.org',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'European competitive Team Fortress 2 League',
}, {
  title: 'ozfortress',
  link: 'https://ozfortress.com',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'The Australian community website for Team Fortress 2',
}, {
  title: 'ESEA',
  link: 'https://play.esea.net/',
  img: require('@tf2-pickup/assets/images/about/serveme_logo.png'),
  description: 'North America 6v6 competitive league',
}];

/**
 * Render the partners with description and images.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Partners(props) {
  return (
    <div className={props.classes.grid}>
      {partners.map(partner => (
        <span
          key={partner.title}
          className={props.classes.gridItem}
        >
          <img
            src={partner.img}
            alt={partner.title}
            className={props.classes.image}
          />

          <Link href={partner.link}>
            <Typography typography="title">
              {partner.title}
            </Typography>
          </Link>

          <Typography typography="body1">
            {partner.description}
          </Typography>
        </span>
      ))}
    </div>
  );
}

Partners.propTypes = {
  classes: PropTypes.shape({
    grid: PropTypes.string.isRequired,
    gridItem: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

Partners.styles = {
  grid: {
    display: 'grid',
    gridGap: '24px 8px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },

  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },

  image: {
    height: 64,
    width: 64,
    borderRadius: '50%',
    marginBottom: 5,
  },
};

export default injectSheet(Partners.styles)(Partners);
