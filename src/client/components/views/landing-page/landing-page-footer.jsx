import React from 'react';
import {
  Icon,
  Divider,
  Stylesheet,
  colors,
} from 'tf2pickup-components';
import socialMedia from '@tf2-pickup/configs/social-media';

import Link from '/src/client/components/link';
import { capitalize } from '/src/utils/string';

const styles = Stylesheet.compile({
  footer: {
    padding: '30px 15%',
    backgroundColor: colors.grey900,
    color: colors.grey300,
  },

  container: {
    layout: {
      direction: 'horizontal',
      mainAlign: 'center',
    },
  },

  socialMedia: {
    header: {
      typo: 'display1',
      textAlign: 'center',
      margin: '0 0 30px',
    },

    link: {
      padding: '0 20px',
      color: 'inherit',
    },
  },

  divider: {
    width: '70%',
    margin: '30px 15%',
    backgroundColor: colors.whiteDivider,
  },

  pages: {
    link: {
      typo: 'title',
      padding: '5px 10px',
      color: 'inherit',
      textDecoration: 'none',
    },
  },
});

function LandingPageFooter() {
  const pages = [
    'rules',
    'about',
    'help',
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.socialMedia.header}>
        Check us out on our Social Media!
      </div>

      <div style={styles.container}>
        {Object
          .values(socialMedia)
          .map(value => (
            <Link
              href={value.url}
              key={value.name}
              style={styles.socialMedia.link}
            >
              <Icon
                icon={value.icon}
                className={'mdi-48px'}
                style={{ color: 'inherit' }}
              />
            </Link>
          ))}
      </div>

      <Divider style={styles.divider} />

      <div style={styles.container}>
        {pages.map(route => (
          <Link
            to={`/${route}`}
            key={route}
            style={styles.pages.link}
          >
            {capitalize(route)}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default LandingPageFooter;
