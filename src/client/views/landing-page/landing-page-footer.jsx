import React from 'react';
import {
  Icon,
  Divider,
  colors,
  typography,
} from 'materialize-react';
import injectSheet from 'react-jss';
import socialMedia from '@tf2-pickup/configs/social-media';

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
          .map(value => (
            <Icon
              key={value.icon}
              icon={value.icon}
              className={'mdi-48px'}
              style={{ color: 'inherit' }}
            />
          ))}
      </div>

      <Divider className={classes.divider} />

      <div className={classes.container}>
        {pages.map(route => (
          <div key={route}>{route}</div>
        ))}
      </div>
    </footer>
  );
}

LandingPageFooter.styles = {
  footer: {
    padding: '30px 15%',
    backgroundColor: colors.grey900,
    color: colors.grey300,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
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
    ...typography.title,
    padding: '5px 10px',
    color: 'inherit',
    textDecoration: 'none',
  },
};

export default injectSheet(LandingPageFooter.styles)(LandingPageFooter);
