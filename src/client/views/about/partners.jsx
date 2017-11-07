import React from 'react';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import { Typography } from 'materialize-react';

import Link from '../../components/link';

const partners = [{
  title: 'Serveme.tf',
  link: 'serveme.tf',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Easiest way to borrow a server',
}, {
  title: 'Whitelist.tf',
  link: 'whitelist.tf',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Up to date (league) whitelists for gameservers',
}, {
  title: 'Logs.tf',
  link: 'logs.tf',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Team Fortress 2 log parser and stats generator',
}, {
  title: 'Comp.tf',
  link: 'comp.tf',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Competitive Team Fortress 2 Wiki',
}, {
  title: 'Demos.tf',
  link: 'demos.tf',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Team Fortress 2 demo uploader',
}, {
  title: 'Team Fortress TV',
  link: 'teamfortress.tv',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'Competitive Team Fortress 2 Media',
}, {
  title: 'ETF2L',
  link: 'etf2l.org',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'European competitive Team Fortress 2 League',
}, {
  title: 'ozfortress',
  link: 'ozfortress.com',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'The Australian community website for Team Fortress 2',
}, {
  title: 'ESEA',
  link: 'https://play.esea.net/',
  img: require('../../../assets/images/about/serveme_logo.png'),
  description: 'North America 6v6 competitive league',
}];

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
            <Typography typography="title">{partner.title}</Typography>
          </Link>

          <Typography typography="body1">{partner.description}</Typography>
        </span>
      ))}
    </div>
  );
}

Partners.styles = {
  grid: {
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },

  gridItem: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto',
    textAlign: 'center',
    justifyItems: 'center',
  },

  image: {
    height: 64,
    width: 64,
    borderRadius: '50%',
    marginBottom: 5,
  },
};

export default injectSheet(Partners.styles)(Partners);
