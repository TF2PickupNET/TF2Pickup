import React from 'react';
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

function LandingPageFooter({ classes }) {
  const pages = [
    'rules',
    'about',
    'help',
  ];

  return (
    <footer className={classes.footer}>
      <div className={classes.socialMediaHeader}>
        Check us out on our Social Media!
      </div>

      <div className={classes.container}>
        {Object
          .values(socialMedia)
          .map(data => (
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
          ))}
      </div>

      <Divider className={classes.divider} />

      <div className={classes.container}>
        {pages.map(route => (
          <Link
            href={`/${pages}`}
            key={route}
            className={classes.pageLink}
          >
            {capitalize(route)}
          </Link>
        ))}
      </div>
    </footer>
  );
}

LandingPageFooter.propTypes = { classes: PropTypes.object.isRequired };

LandingPageFooter.styles = {
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

export default injectSheet(LandingPageFooter.styles)(LandingPageFooter);
